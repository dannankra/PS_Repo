## Description

POC for evaluating the performance of Snaplogic app against Cypress.js

## Quick Start
<details>
    <summary>Click to expand</summary>


    --

    Perform the following actions in the projects directory to get started.

    ```bash
    npm i
    ```
</details>

## Scope
<details>
    <summary>Click to expand</summary>


    --

    ## POC 1:-

    > Scenario 1:-

    Create project space and project through api call
    Pipeline creation(importing the pipeline through api call)
    Execution of pipelines
    Switch to studio and verify the result

    > Scenario 2 :-

    Execute a long running pipeline,(first import the pipeline) 
    while executing the pipeline
    Go to studio and click on card “executing”
    Verify the result(it should show only the executing pipeline

    > Scenario 3:-

    Execute a pipeline
    After execution complete, go to studio dashboard
    Click on completed card
    Verify only the completed pipeline is showing in the dashboard

    > Scenario 4:-

    Execute a pipeline(Import the failed pipeline and execute)
    After execution complete, go to studio dashboard
    Click on failed card
    Verify only the failed pipeline is showing in the dashboard

</details>

## How to run the test
<details>
    <summary>Click to expand</summary>


    --

    Perform the following actions in the projects directory to run the tests

    > Via the Dashboard

    ```bash
    npm run cypress:open
    ```

     > Via the Console

    ```bash
    npm run cypress:run
    ```
</details>