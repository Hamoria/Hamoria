import type { ActionFunctionArgs, RouterContextProvider } from "react-router"

import type { Replace } from "./Replace"

export type ActionArgs = Replace<
	ActionFunctionArgs,
	{
		context: RouterContextProvider
	}
>

export type Action<TResult, TArgs extends ActionArgs> = (args: TArgs) => Promise<TResult>
