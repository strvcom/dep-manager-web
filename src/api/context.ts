import { APIGatewayEvent, Context as AWSContext } from 'aws-lambda'

export interface SchemaContext {
  aws: {
    event: APIGatewayEvent
    context: AWSContext
  }
}
