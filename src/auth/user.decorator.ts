//decorator token se data nikal kr user ke haath me dega 

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Passport library ne token check karke user data yahan 'request.user' mein rakh diya tha
    return request.user; 
  },
);