import { APIGatewayEvent, Context as AWSContext } from 'aws-lambda'

export interface ResolverContextType {
  aws: {
    event: APIGatewayEvent
    context: AWSContext
  }
}
