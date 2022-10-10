import * as df from "durable-functions"
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpStart: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    const orchistrationClient = df.getClient(context);
    const instanceId = await orchistrationClient.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return orchistrationClient.createCheckStatusResponse(context.bindingData.req, instanceId);
};

export default httpStart;
