@echo off
setlocal enabledelayedexpansion

:: Set the output filename
set output_file=list.txt

:: Initialize the list in the output file
echo {"list": [ > %output_file%

:: Flag to handle the first item formatting
set first=true

:: Loop through all .html files in the current directory
for %%F in (*.html) do (
    :: If this is not the first file, add a comma before the filename
    if "!first!"=="true" (
        set first=false
    ) else (
        echo , >> %output_file%
    )
    
    :: Add the filename without extension to the output file
    echo "%%~nF" >> %output_file%
)

:: Close the JSON array in the output file
echo ]} >> %output_file%

:: Done
echo Done! Filenames written to %output_file%.
endlocal
