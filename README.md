OCPIEF Means: Open Cordova Project in Existing Folder
=======================================

https://blogs.msdn.microsoft.com/rido/2016/05/10/ocpief/

>Creates a Visual Studio 2015 cordova project in the current folder

## Install

```npm i -g ocpief```

## Important Note

This tool will generate a Visual Studio project file, with the same name as the directory and jsproj extension.
This project file is not supported and may be outdated, for production usage you must always use the wizard FILE->NEW PROJECT->FROM EXISTING FOLDER (see https://blogs.msdn.microsoft.com/rido/2016/05/10/ocpief )

In the latest version [0.0.3-beta](https://github.com/ridomin/ocpief/releases/tag/0.0.3-beta) the project file has been modified with the next changes:

- block TypeScript compilation from MSBuild (in favor of gulp based workflows)
- removed Windows targets that I never use

- taco.json upgraded to 6.2.2
- config.xml configured for Windows 10

## Telemetry
this release includes basic telemetry to send anonymous tracking data to application insights. the data is publicily available upon request
