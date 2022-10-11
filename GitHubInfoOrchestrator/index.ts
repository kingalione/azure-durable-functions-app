/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 *
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *    function app in Kudu
 */

import * as df from "durable-functions";

const orchestrator = df.orchestrator(function* (context) {
  const firstRetryIntervalInMilliseconds: number = 1000;
  const maxNumberOfAttempts: number = 3;
  const maxRetryIntervalInMilliseconds: number = 1000;
  const retryTimeoutInMilliseconds: number = 7000;

  const retryConfig: df.RetryOptions = new df.RetryOptions(
    firstRetryIntervalInMilliseconds,
    maxNumberOfAttempts
  );
  retryConfig.maxRetryIntervalInMilliseconds = maxRetryIntervalInMilliseconds;
  retryConfig.retryTimeoutInMilliseconds = retryTimeoutInMilliseconds;

  // For demo purposes remove the raiseExecption flag after one failure
  if (context.bindingData.context.isReplaying == true) {
    context.bindingData.input.raiseException = false;
  }

  const userId: string = yield context.df.callActivityWithRetry(
    "GetRepositoryDetailsByName",
    retryConfig,
    context.bindingData.input
  );

  context.bindingData.input.userId = userId;

  const userInfos = yield context.df.callActivityWithRetry(
    "GetUserDetailsById",
    retryConfig,
    context.bindingData.input
  );

  return userInfos;
});

export default orchestrator;
