#!/usr/bin/env bash

set -u

check() {
  local name="$1"
  local state="$2"
  local detail="$3"
  printf '[%s] %s: %s\n' "$state" "$name" "$detail"
}

start_check() {
  printf 'Checking %s...\n' "$1"
}

command_version() {
  "$1" "$2" 2>/dev/null | head -n 1
}

printf '%s\n' 'GitHub Copilot workshop doctor'
printf '%s\n' 'This report checks local tooling and sends one small Auto-model prompt to validate Copilot CLI sign-in and connectivity.'
printf '%s\n' 'It checks Git, Node.js 22+, npm, Copilot CLI, Copilot CLI sign-in and connectivity, .NET SDK 10, GitHub Copilot app, VS Code or VS Code Insiders, and Visual Studio 2026 availability.'
printf '\n'

start_check 'Git'
if command -v git >/dev/null 2>&1; then
  git_state='READY'
  check 'Git' "$git_state" "$(command_version git --version)"
else
  git_state='MISSING'
  check 'Git' "$git_state" 'Install Git from https://git-scm.com/downloads.'
fi

start_check 'Node.js'
if command -v node >/dev/null 2>&1; then
  node_version="$(command_version node --version)"
  node_major="$(printf '%s' "$node_version" | sed -E 's/[^0-9]*([0-9]+).*/\1/')"
  if [ -n "$node_major" ] && [ "$node_major" -ge 22 ]; then
    node_state='READY'
    check 'Node.js' "$node_state" "$node_version"
  else
    node_state='MISSING'
    check 'Node.js' "$node_state" "Could not read a usable version; install Node.js 22 or newer."
  fi
else
  node_state='MISSING'
  check 'Node.js' "$node_state" 'Install Node.js 22 or newer from https://nodejs.org/.'
fi

start_check 'npm'
if command -v npm >/dev/null 2>&1; then
  npm_state='READY'
  check 'npm' "$npm_state" "$(command_version npm --version)"
else
  npm_state='MISSING'
  check 'npm' "$npm_state" 'Install Node.js 22 or newer so npm is available.'
fi

start_check 'GitHub Copilot CLI'
if command -v copilot >/dev/null 2>&1; then
  copilot_state='READY'
  check 'Copilot CLI' "$copilot_state" "$(command_version copilot --version)"
else
  copilot_state='MISSING'
  check 'Copilot CLI' "$copilot_state" 'Install from https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli.'
fi

start_check '.NET SDK 10'
if command -v dotnet >/dev/null 2>&1 && dotnet --list-sdks 2>/dev/null | grep -q '^10\.'; then
  dotnet_state='READY'
  check '.NET SDK 10' "$dotnet_state" 'A .NET 10 SDK is installed.'
else
  dotnet_state='MISSING'
  check '.NET SDK 10' "$dotnet_state" 'Install the .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0.'
fi

start_check 'GitHub Copilot app'
os_name="$(uname -s)"
if [ "$os_name" = 'Darwin' ] && { [ -d '/Applications/GitHub Copilot.app' ] || [ -d "$HOME/Applications/GitHub Copilot.app" ]; }; then
  app_state='READY'
  check 'GitHub Copilot app' "$app_state" 'The GitHub Copilot app was detected.'
elif [ "$os_name" = 'Linux' ] && { [ -f '/usr/share/applications/github-copilot.desktop' ] || command -v github-copilot >/dev/null 2>&1; }; then
  app_state='READY'
  check 'GitHub Copilot app' "$app_state" 'The GitHub Copilot app was detected.'
else
  app_state='MISSING'
  check 'GitHub Copilot app' "$app_state" 'Install from https://github.com/features/ai/github-app.'
fi

start_check 'VS Code or VS Code Insiders'
if command -v code >/dev/null 2>&1; then
  code_state='READY'
  check 'VS Code or VS Code Insiders' "$code_state" 'Visual Studio Code was detected.'
elif command -v code-insiders >/dev/null 2>&1; then
  code_state='READY'
  check 'VS Code or VS Code Insiders' "$code_state" 'Visual Studio Code Insiders was detected.'
elif [ "$os_name" = 'Darwin' ] && { [ -d '/Applications/Visual Studio Code.app' ] || [ -d '/Applications/Visual Studio Code - Insiders.app' ] || [ -d "$HOME/Applications/Visual Studio Code.app" ] || [ -d "$HOME/Applications/Visual Studio Code - Insiders.app" ]; }; then
  code_state='READY'
  check 'VS Code or VS Code Insiders' "$code_state" 'Visual Studio Code or Visual Studio Code Insiders was detected.'
elif [ "$os_name" = 'Linux' ] && { [ -f '/usr/share/applications/code.desktop' ] || [ -f '/usr/share/applications/code-insiders.desktop' ]; }; then
  code_state='READY'
  check 'VS Code or VS Code Insiders' "$code_state" 'Visual Studio Code or Visual Studio Code Insiders was detected.'
else
  code_state='MISSING'
  check 'VS Code or VS Code Insiders' "$code_state" 'Install Visual Studio Code or Visual Studio Code Insiders from https://code.visualstudio.com/.'
fi

start_check 'Visual Studio 2026'
check 'Visual Studio 2026' 'NOT APPLICABLE' 'This lab requires Windows.'

printf '\n'
start_check 'Copilot CLI sign-in and connectivity (final check)'
if [ "$copilot_state" = 'READY' ]; then
  printf '%s\n' 'This can take up to a minute. Waiting for Copilot to respond...'
  connectivity_file="$(mktemp "${TMPDIR:-/tmp}/workshop-doctor-connectivity.XXXXXX")"
  copilot -p 'Reply with exactly: workshop doctor connectivity check passed.' --model auto >"$connectivity_file" 2>/dev/null &
  connectivity_pid=$!
  spinner='|/-\'
  frame=0

  while kill -0 "$connectivity_pid" 2>/dev/null; do
    printf '\rWaiting for Copilot to respond %s' "${spinner:$frame:1}"
    frame=$(( (frame + 1) % 4 ))
    sleep 0.25
  done

  wait "$connectivity_pid"
  connectivity_exit_code=$?
  printf '\r%80s\r' ''
  connectivity_output="$(cat "$connectivity_file")"
  rm -f "$connectivity_file"
  connectivity_response="$(printf '%s\n' "$connectivity_output" | grep -F 'workshop doctor connectivity check passed' | tail -n 1)"
  if [ "$connectivity_exit_code" -eq 0 ] && [ -n "$connectivity_response" ]; then
    connectivity_state='READY'
    check 'Copilot CLI connectivity' "$connectivity_state" 'Signed in and received: workshop doctor connectivity check passed.'
  else
    connectivity_state='MISSING'
    check 'Copilot CLI connectivity' "$connectivity_state" 'Could not authenticate or receive a Copilot response. Run copilot login, then try again.'
  fi
else
  connectivity_state='MISSING'
  check 'Copilot CLI connectivity' "$connectivity_state" 'Install Copilot CLI before checking sign-in and connectivity.'
fi

lab_state() {
  for state in "$@"; do
    if [ "$state" = 'MISSING' ]; then
      printf '%s' 'Needs setup'
      return
    fi
  done
  printf '%s' 'Ready'
}

app_lab="$(lab_state "$git_state" "$node_state" "$app_state")"
cli_lab="$(lab_state "$git_state" "$node_state" "$npm_state" "$copilot_state" "$connectivity_state" "$code_state")"
vscode_lab="$(lab_state "$git_state" "$node_state" "$npm_state" "$code_state")"

printf '\n%s\n' 'Lab readiness'
printf '%s\n' "Copilot app: $app_lab"
printf '%s\n' "Copilot CLI: $cli_lab"
printf '%s\n' "VS Code: $vscode_lab (also verify VS Code 1.135+, the Copilot extension, and Local session sign-in)"
printf '%s\n' 'Visual Studio 2026: Not applicable on this operating system'

if [ "$app_lab" = 'Ready' ] && [ "$cli_lab" = 'Ready' ] && [ "$vscode_lab" = 'Ready' ]; then
  printf '\n%s\n' 'Compatible-lab status: Ready. In Copilot CLI, run copilot login and select GPT-5.3 Codex with /model.'
else
  printf '\n%s\n' 'Compatible-lab status: Needs setup. Install the missing tools for the labs you plan to attend.'
fi
