import { ApiOkResponse as SwaggerOkResponse } from "@nestjs/swagger";

export const ApiResponseBasic = (sucessCode) => SwaggerOkResponse({
	content: {
		'application/json': {
			example: sucessCode
		}
	},
});