@echo off
setlocal enabledelayedexpansion

:: Initialize empty list
set folderList=

:: Loop through directories in current directory
for /d %%F in (*) do (
    :: Add folder name to the list, separated by commas
    if defined folderList (
        set folderList=!folderList!, "%%F"
    ) else (
        set folderList="%%F"
    )
)

:: Output the result in the required format
echo {"list":[ %folderList% ]} > blogList.txt

echo Folder list written to blogList.txt
