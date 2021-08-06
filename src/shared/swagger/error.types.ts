import { ApiBadRequestResponse as SwaggerApiBadRequest } from "@nestjs/swagger";

export const ApiBadRequest= (ErrorCode) => SwaggerApiBadRequest({
	content: {
		'application/json': {
			example: ErrorCode
		}
	}
});

