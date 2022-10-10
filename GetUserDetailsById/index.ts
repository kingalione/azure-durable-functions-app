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
): Promise<JSON> {
  const octokit = new Octokit();

  const apiPath = `/users/${context.bindingData.userId.toString()}`;

  const searchResult = await octokit.request(apiPath);

  const userData = <JSON>(<any>searchResult.data);

  return userData;
};

export default activityFunction;
