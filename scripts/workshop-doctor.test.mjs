import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const scripts = dirname(fileURLToPath(import.meta.url));
const powershell = process.platform === 'win32' ? 'powershell.exe' : 'pwsh';
const hasPowerShell = spawnSync(powershell, ['-NoProfile', '-Command', 'exit 0']).status === 0;
const hasBash = spawnSync('bash', ['--version']).status === 0;
const runtimeLabel = '.NET 10 or 11 ASP.NET Core Runtime';

const cases = [
  { name: '.NET 10', sdk: '10.0.404', runtime: '10.0.15', state: 'READY' },
  { name: '.NET 11 only', sdk: '11.0.100', runtime: '11.0.0', state: 'READY' },
  { name: 'older runtime only', sdk: '11.0.100', runtime: '9.0.10', state: 'MISSING' },
  { name: 'preview runtime only', sdk: '11.0.100', runtime: '11.0.0-rc.3', state: 'MISSING' }
];

const powershellMocks = String.raw`
$ErrorActionPreference = 'Stop'
function Get-Command {
    [CmdletBinding()]
    param([Parameter(Position=0)][string]$Name)
    if ($Name -in @('git', 'node', 'npm', 'dotnet')) {
        return [pscustomobject]@{ Path = $Name; Source = $Name }
    }
}
function git { 'git version 2.0' }
function node { 'v22.0.0' }
function npm { '11.0.0' }
function dotnet {
    param([string]$Argument)
    if ($Argument -eq '--list-sdks') { $env:DOCTOR_TEST_SDK }
    if ($Argument -eq '--list-runtimes') { $env:DOCTOR_TEST_RUNTIMES }
}
function Join-Path {
    param([string]$Path, [string]$ChildPath)
    if ($ChildPath -eq 'Microsoft Visual Studio\Installer\vswhere.exe') { 'mock-vswhere' }
    else { 'missing-path' }
}
function Test-Path { param([string]$Path) $Path -eq 'mock-vswhere' }
function mock-vswhere { 'mock-visual-studio' }
& $env:DOCTOR_TEST_SCRIPT
`;

function assertRuntimeCheck(result, state) {
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  assert.ok(result.stdout.includes(`[${state}] ${runtimeLabel}:`), result.stdout);
}

for (const scenario of cases) {
  const env = {
    ...process.env,
    DOCTOR_TEST_SDK: `${scenario.sdk} [stub]`,
    DOCTOR_TEST_RUNTIMES: `Microsoft.AspNetCore.App ${scenario.runtime} [stub]`
  };

  test(`PowerShell doctor: ${scenario.name}`, { skip: !hasPowerShell }, () => {
    const result = spawnSync(
      powershell,
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', powershellMocks],
      {
        encoding: 'utf8',
        env: { ...env, DOCTOR_TEST_SCRIPT: join(scripts, 'workshop-doctor.ps1') }
      }
    );
    assertRuntimeCheck(result, scenario.state);
    const labState = scenario.state === 'READY' ? 'Ready' : 'Needs setup';
    assert.ok(result.stdout.includes(`Visual Studio 2026: ${labState}`), result.stdout);
  });

  test(`Bash doctor: ${scenario.name}`, { skip: !hasBash }, (t) => {
    const bin = mkdtempSync(join(tmpdir(), 'workshop-doctor-test-'));
    t.after(() => rmSync(bin, { recursive: true, force: true }));
    writeFileSync(
      join(bin, 'dotnet'),
      '#!/bin/sh\ncase "$1" in\n  --list-sdks) printf "%s\\n" "$DOCTOR_TEST_SDK" ;;\n  --list-runtimes) printf "%s\\n" "$DOCTOR_TEST_RUNTIMES" ;;\nesac\n',
      { mode: 0o755 }
    );
    writeFileSync(
      join(bin, 'copilot'),
      '#!/bin/sh\nprintf "%s\\n" "workshop doctor connectivity check passed"\n',
      { mode: 0o755 }
    );
    const result = spawnSync('bash', [join(scripts, 'workshop-doctor.sh')], {
      encoding: 'utf8',
      env: { ...env, PATH: `${bin}${delimiter}${process.env.PATH}` }
    });
    assertRuntimeCheck(result, scenario.state);
  });
}
