---
sidebar_position: 2
---

# 📝 Panels Description

Introducing the functions and uses of important panels.

## Top Panel

This panel is mainly used to run workflows.

|Module | Description|
|------------ | -------------|
|Run Flow| Run current workflow|
|Rerun Nodes| Run selected nodes|
|Open in Text Editor| Look at the yaml source code of the workflow|

## Left Panel

This panel is mainly used to create configuration workflows and blocks.

|Module | Description|
|------------ | -------------|
|Flows | Workflow canvas, one project can create multiple. All flow dependencies in the same project can be shared.|
|Blocks | Blocks, converted from Scriptlet. Is a reusable custom tool|
|Workspace | Source code.|
|Storage | The location where static resources that need to be used in the workflow are stored. Static resources include images, videos, and table content.|
|Secrets | Some blocks in the workflow need to call third-party services. The secrets required to call the service can be accessed using the Secrets module.|

## Bottom Panel

This panel is mainly used for engineers' in-depth development and debugging workflow.

|Module | Description|
|------------ | -------------|
|Terminal | A terminal connected to the container OVM. Something to note, the system running in OVM is Linux.|
|Packages | Panel for installing third-party libraries for Python and JS. It should be noted that the Python libraries installed through the panel will be automatically added to `requirements.txt`. Users who install directly using Terminal need to add it manually|
|Flow Logs | Logs generated during workflow running.|
|Container Scripts |A script that needs to be automatically executed when the project is started for the first time in the OVM container.|
|Problems | Coding error|

## Right Panel

This panel is mainly used to reference ready-made blocks.

The upper part of the panel is the package, and the lower part of the panel is the functional modules in the package. It should be noted that if none are selected, all packages and function modules will be listed.

|Module | Description|
|------------ | -------------|
|Builtin Packages| OOMOL will pre-install some necessary packages|
|Packages Store| You can download packages shared by other users in the Packages Store|