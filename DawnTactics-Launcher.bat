@echo off
chcp 65001 >nul
title DawnTactics AI - Standalone Desktop Launcher
cls
echo ======================================================================
echo           DAWNTACTICS AI - MLBB DRAFT & STRATEGY ENGINE
echo                      STANDALONE DESKTOP LAUNCHER
echo ======================================================================
echo.
echo [1/2] Verifying local environment...
cd /d "%~dp0"

echo [2/2] Launching DawnTactics AI on https://localhost:5173 ...
start "" "https://localhost:5173"

npm run dev:https
pause
