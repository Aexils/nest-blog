FROM public.ecr.aws/lambda/nodejs:22

COPY dist ./dist
COPY node_modules ./node_modules
COPY package*.json ./

CMD ["dist/lambda.js"]
