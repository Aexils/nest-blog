import { Handler, Context, Callback } from 'aws-lambda';
import { createApp } from './main';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: (event: any, context: Context, callback: Callback) => any;

const bootstrap = async (): Promise<typeof cachedServer> => {
  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance(); // 👈 important
  return serverlessExpress({ app: expressApp });
};

export const handler: Handler = async (event, context, callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context, callback);
};
