Set-StrictMode -Version Latest

$checks = @{}

function Write-Check {
    param(
        [string]$Name,
        [ValidateSet('Ready', 'Missing', 'Manual', 'Not applicable')][string]$State,
        [string]$Detail
    )

    $checks[$Name] = $State
    Write-Output ("[{0}] {1}: {2}" -f $State.ToUpper(), $Name, $Detail)
}

function Start-Check {
    param([string]$Name)

    Write-Output "Checking $Name..."
}

function Get-CommandPath {
    param([string]$Name)

    $command = Get-Command -Name $Name -ErrorAction SilentlyContinue
    if ($null -eq $command) {
        return $null
    }

    if ($command.Path) {
        return $command.Path
    }

    return $command.Source
}

function Get-MajorVersion {
    param([string]$Value)

    $match = [regex]::Match($Value, '\d+')
    if ($match.Success) {
        return [int]$match.Value
    }

    return 0
}

function Get-LabState {
    param([string[]]$RequiredChecks)

    if ($RequiredChecks | Where-Object { $checks[$_] -eq 'Missing' }) {
        return 'Needs setup'
    }

    return 'Ready'
}

Write-Output 'GitHub Copilot workshop doctor'
Write-Output 'This report checks local tooling and sends one small Auto-model prompt to validate Copilot CLI sign-in and connectivity.'
Write-Output 'It checks Git, Node.js 22+, npm, Copilot CLI, Copilot CLI sign-in and connectivity, .NET SDK 10, GitHub Copilot app, VS Code or VS Code Insiders, and Visual Studio 2026.'
Write-Output ''

Start-Check 'Git'
$gitPath = Get-CommandPath 'git'
if ($gitPath) {
    Write-Check 'Git' 'Ready' (& git --version)
} else {
    Write-Check 'Git' 'Missing' 'Install Git from https://git-scm.com/downloads.'
}

Start-Check 'Node.js'
$nodePath = Get-CommandPath 'node'
if ($nodePath) {
    $nodeVersion = (& node --version)
    if ((Get-MajorVersion $nodeVersion) -ge 22) {
        Write-Check 'Node.js' 'Ready' $nodeVersion
    } else {
        Write-Check 'Node.js' 'Missing' "Found $nodeVersion; install Node.js 22 or newer."
    }
} else {
    Write-Check 'Node.js' 'Missing' 'Install Node.js 22 or newer from https://nodejs.org/.'
}

Start-Check 'npm'
$npmPath = Get-CommandPath 'npm'
if ($npmPath) {
    Write-Check 'npm' 'Ready' (& npm --version)
} else {
    Write-Check 'npm' 'Missing' 'Install Node.js 22 or newer so npm is available.'
}

Start-Check 'GitHub Copilot CLI'
$copilotPath = Get-CommandPath 'copilot'
if ($copilotPath) {
    Write-Check 'Copilot CLI' 'Ready' (& copilot --version)
} else {
    Write-Check 'Copilot CLI' 'Missing' 'Install from https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli.'
}

Start-Check '.NET SDK 10'
$dotnetPath = Get-CommandPath 'dotnet'
if ($dotnetPath) {
    $dotnetSdks = @(& dotnet --list-sdks 2>$null)
    if ($dotnetSdks -match '^10\.') {
        Write-Check '.NET SDK 10' 'Ready' 'A .NET 10 SDK is installed.'
    } else {
        Write-Check '.NET SDK 10' 'Missing' 'Install the .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0.'
    }
} else {
    Write-Check '.NET SDK 10' 'Missing' 'Install the .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0.'
}

Start-Check 'GitHub Copilot app'
$appPaths = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\GitHub Copilot\GitHub Copilot.exe'),
    (Join-Path $env:ProgramFiles 'GitHub Copilot\GitHub Copilot.exe')
)
$startApp = Get-Command Get-StartApps -ErrorAction SilentlyContinue
$appInstalled = @($appPaths | Where-Object { Test-Path $_ }).Count -gt 0
if (-not $appInstalled -and $startApp) {
    $appInstalled = @(Get-StartApps | Where-Object { $_.Name -match '^GitHub Copilot$' }).Count -gt 0
}
if ($appInstalled) {
    Write-Check 'GitHub Copilot app' 'Ready' 'The GitHub Copilot app was detected.'
} else {
    Write-Check 'GitHub Copilot app' 'Missing' 'Install from https://github.com/features/ai/github-app.'
}

Start-Check 'VS Code or VS Code Insiders'
$codePath = Get-CommandPath 'code'
$codeInsidersPath = Get-CommandPath 'code-insiders'
$codePaths = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code\Code.exe'),
    (Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code Insiders\Code - Insiders.exe'),
    (Join-Path $env:ProgramFiles 'Microsoft VS Code\Code.exe'),
    (Join-Path $env:ProgramFiles 'Microsoft VS Code Insiders\Code - Insiders.exe')
)
$codeEditor = $null
if ($codePath) {
    $codeEditor = 'Visual Studio Code'
} elseif ($codeInsidersPath) {
    $codeEditor = 'Visual Studio Code Insiders'
} elseif (@($codePaths | Where-Object { Test-Path $_ }).Count -gt 0) {
    $codeEditor = 'Visual Studio Code or Visual Studio Code Insiders'
} elseif ($startApp) {
    $codeEditor = @(Get-StartApps | Where-Object { $_.Name -match '^Visual Studio Code( - Insiders)?$' } | Select-Object -First 1).Name
}
if ($codeEditor) {
    Write-Check 'VS Code or VS Code Insiders' 'Ready' "$codeEditor was detected."
} else {
    Write-Check 'VS Code or VS Code Insiders' 'Missing' 'Install Visual Studio Code or Visual Studio Code Insiders from https://code.visualstudio.com/.'
}

Start-Check 'Visual Studio 2026'
$visualStudioPath = $null
$vswhere = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\vswhere.exe'
if (Test-Path $vswhere) {
    $visualStudioPath = & $vswhere -latest -products * -property installationPath
}
if ($visualStudioPath) {
    Write-Check 'Visual Studio' 'Ready' $visualStudioPath
} else {
    Write-Check 'Visual Studio' 'Missing' 'Install Visual Studio 2026 with ASP.NET and web development.'
}

Write-Output ''
Start-Check 'Copilot CLI sign-in and connectivity (final check)'
if ($copilotPath) {
    Write-Output 'This can take up to a minute. Waiting for Copilot to respond...'

    $connectivityPrompt = 'Reply with exactly: workshop doctor connectivity check passed.'
    $process = [System.Diagnostics.Process]::new()
    $process.StartInfo.FileName = $copilotPath
    $process.StartInfo.Arguments = "-p `"$connectivityPrompt`" --model auto"
    $process.StartInfo.UseShellExecute = $false
    $process.StartInfo.RedirectStandardOutput = $true
    $process.StartInfo.RedirectStandardError = $true

    [void]$process.Start()
    $outputTask = $process.StandardOutput.ReadToEndAsync()
    $errorTask = $process.StandardError.ReadToEndAsync()
    $spinner = @('|', '/', '-', '\')
    $frame = 0

    while (-not $process.HasExited) {
        Write-Progress -Activity 'Checking Copilot CLI sign-in and connectivity' -Status "Waiting for Copilot to respond $($spinner[$frame])" -PercentComplete -1
        Start-Sleep -Milliseconds 250
        $frame = ($frame + 1) % $spinner.Count
    }

    Write-Progress -Activity 'Checking Copilot CLI sign-in and connectivity' -Completed
    $connectivityOutput = $outputTask.Result
    $null = $errorTask.Result
    $connectivityResponse = @(
        $connectivityOutput -split "`r?`n" | Where-Object {
            $_ -match 'workshop doctor connectivity check passed'
        }
    ) | Select-Object -Last 1

    if ($process.ExitCode -eq 0 -and $connectivityResponse) {
        Write-Check 'Copilot CLI connectivity' 'Ready' 'Signed in and received: workshop doctor connectivity check passed.'
    } else {
        Write-Check 'Copilot CLI connectivity' 'Missing' 'Could not authenticate or receive a Copilot response. Run copilot login, then try again.'
    }
} else {
    Write-Check 'Copilot CLI connectivity' 'Missing' 'Install Copilot CLI before checking sign-in and connectivity.'
}

Write-Output ''
Write-Output 'Lab readiness'
$appLab = Get-LabState @('Git', 'Node.js', 'GitHub Copilot app')
$cliLab = Get-LabState @('Git', 'Node.js', 'npm', 'Copilot CLI', 'Copilot CLI connectivity', 'VS Code or VS Code Insiders')
$vscodeLab = Get-LabState @('Git', 'Node.js', 'npm', 'VS Code or VS Code Insiders')
$visualStudioLab = Get-LabState @('Git', '.NET SDK 10', 'Visual Studio')
Write-Output "Copilot app: $appLab"
Write-Output "Copilot CLI: $cliLab"
Write-Output "VS Code: $vscodeLab (also verify VS Code 1.135+, the Copilot extension, and Local session sign-in)"
Write-Output "Visual Studio 2026: $visualStudioLab"

if (@($appLab, $cliLab, $vscodeLab, $visualStudioLab) -contains 'Needs setup') {
    Write-Output ''
    Write-Output 'Full-event status: Needs setup. Install the missing tools for the labs you plan to attend.'
} else {
    Write-Output ''
    Write-Output 'Full-event status: Ready. In Copilot CLI, run copilot login and select GPT-5.3 Codex with /model.'
}
