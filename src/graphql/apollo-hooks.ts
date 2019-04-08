import {OperationVariables} from "apollo-client"
import {DocumentNode} from "graphql"
import * as ReactApolloHooks from "react-apollo-hooks"

export type QueryHookOptions<
    TVariables,
    TCache = object
> = ReactApolloHooks.QueryHookOptions<TVariables, TCache>
export type MutationHookOptions<
    TData,
    TVariables,
    TCache = object
> = ReactApolloHooks.MutationHookOptions<TData, TVariables, TCache>
export type SubscriptionHookOptions<
    TData,
    TVariables,
    TCache = object
> = ReactApolloHooks.SubscriptionHookOptions<TData, TVariables, TCache>
export function useQuery<
    TData = any,
    TVariables = OperationVariables,
    TCache = object
>(query: DocumentNode, options?: QueryHookOptions<TVariables, TCache>) {
    return ReactApolloHooks.useQuery<TData, TVariables, TCache>(
        query,
        !options
            ? options
            : {
                  ...options,
                  suspend: !(
                      options.fetchPolicy !== undefined &&
                      options.fetchPolicy !== "cache-first"
                  )
              }
    )
}
export {useMutation, useSubscription} from "react-apollo-hooks"
