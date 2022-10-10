/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

import { AzureFunction, Context } from "@azure/functions";
import { Octokit } from "@octokit/core";

const activityFunction: AzureFunction = async function (
  context: Context
): Promise<string> {
  const octokit = new Octokit();

  const query = `${context.bindingData.repositoryName.toString()} in:name`;

  const searchResult = await octokit.request("GET /search/repositories", {
    q: query,
  });

  const exactMatch = searchResult.data.items.find(
    (item) => item.name === context.bindingData.repositoryName.toString()
  );

  return exactMatch.owner.login;
};

export default activityFunction;
