export type Maybe<T> = T | null

/** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTimeOffset = any

/** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */

/** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTime = any

export type Decimal = number

/** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
export type Milliseconds = number

/** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
export type Seconds = number

// ====================================================
// Documents
// ====================================================

export type CurrentTabVariables = {}

export type CurrentTabQuery = {
    __typename?: "Query"

    currentTab: number
}

export type ItemsVariables = {}

export type ItemsQuery = {
    __typename?: "Query"

    items: ItemsItems[]
}

export type ItemsItems = {
    __typename?: "ItemType"

    id: string

    name: string

    selectedCount: number
}

export type NewItemVariables = {
    items: string[]
}

export type NewItemMutation = {
    __typename?: "Mutation"

    createSubmission: NewItemCreateSubmission
}

export type NewItemCreateSubmission = {
    __typename?: "Submission"

    id: string

    items: NewItemItems[]

    submitted: DateTimeOffset
}

export type NewItemItems = {
    __typename?: "ItemSubmissionBatch"

    count: number

    item: NewItemItem
}

export type NewItemItem = {
    __typename?: "ItemType"

    id: string

    name: string
}

export type ResetItemSelectedCountsVariables = {}

export type ResetItemSelectedCountsMutation = {
    __typename?: "Mutation"

    resetItemSelectedCounts: boolean
}

export type SetCurrentTabVariables = {
    tab: number
}

export type SetCurrentTabMutation = {
    __typename?: "Mutation"

    setCurrentTab: number
}

export type SubmissionsVariables = {}

export type SubmissionsQuery = {
    __typename?: "Query"

    submissions: SubmissionsSubmissions[]
}

export type SubmissionsSubmissions = {
    __typename?: "Submission"

    id: string

    items: SubmissionsItems[]

    submitted: DateTimeOffset
}

export type SubmissionsItems = {
    __typename?: "ItemSubmissionBatch"

    count: number

    item: SubmissionsItem
}

export type SubmissionsItem = {
    __typename?: "ItemType"

    id: string

    name: string
}

export type SubmitItemsVariables = {
    items: string[]
}

export type SubmitItemsMutation = {
    __typename?: "Mutation"

    createSubmission: SubmitItemsCreateSubmission
}

export type SubmitItemsCreateSubmission = {
    __typename?: "Submission"

    items: SubmitItemsItems[]
}

export type SubmitItemsItems = {
    __typename?: "ItemSubmissionBatch"

    count: number
}

export type UpdateItemSelectedCountVariables = {
    id: string
    selectedCount: number
}

export type UpdateItemSelectedCountMutation = {
    __typename?: "Mutation"

    updateItemSelectedCount: number
}

import * as ReactApollo from "react-apollo"
import * as React from "react"

import {
    useQuery as useApolloQuery,
    useMutation as useApolloMutation,
    QueryHookOptions,
    MutationHookOptions
} from "react-apollo-hooks"
import gql from "graphql-tag"

// ====================================================
// Components
// ====================================================

export const CurrentTabDocument = gql`
    query CurrentTab {
        currentTab @client
    }
`
export function useCurrentTab(
    baseOptions?: QueryHookOptions<CurrentTabVariables>
) {
    return useApolloQuery<CurrentTabQuery, CurrentTabVariables>(
        CurrentTabDocument,
        baseOptions
    )
}
export const ItemsDocument = gql`
    query Items {
        items {
            id
            name
            selectedCount @client
        }
    }
`
export function useItems(baseOptions?: QueryHookOptions<ItemsVariables>) {
    return useApolloQuery<ItemsQuery, ItemsVariables>(
        ItemsDocument,
        baseOptions
    )
}
export const NewItemDocument = gql`
    mutation NewItem($items: [ID!]!) {
        createSubmission(items: $items) {
            id
            items {
                count
                item {
                    id
                    name
                }
            }
            submitted
        }
    }
`
export function useNewItem(
    baseOptions?: MutationHookOptions<NewItemMutation, NewItemVariables>
) {
    return useApolloMutation<NewItemMutation, NewItemVariables>(
        NewItemDocument,
        baseOptions
    )
}
export const ResetItemSelectedCountsDocument = gql`
    mutation ResetItemSelectedCounts {
        resetItemSelectedCounts @client
    }
`
export function useResetItemSelectedCounts(
    baseOptions?: MutationHookOptions<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsVariables
    >
) {
    return useApolloMutation<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsVariables
    >(ResetItemSelectedCountsDocument, baseOptions)
}
export const SetCurrentTabDocument = gql`
    mutation SetCurrentTab($tab: Int!) {
        setCurrentTab(tab: $tab) @client
    }
`
export function useSetCurrentTab(
    baseOptions?: MutationHookOptions<
        SetCurrentTabMutation,
        SetCurrentTabVariables
    >
) {
    return useApolloMutation<SetCurrentTabMutation, SetCurrentTabVariables>(
        SetCurrentTabDocument,
        baseOptions
    )
}
export const SubmissionsDocument = gql`
    query Submissions {
        submissions {
            id
            items {
                count
                item {
                    id
                    name
                }
            }
            submitted
        }
    }
`
export function useSubmissions(
    baseOptions?: QueryHookOptions<SubmissionsVariables>
) {
    return useApolloQuery<SubmissionsQuery, SubmissionsVariables>(
        SubmissionsDocument,
        baseOptions
    )
}
export const SubmitItemsDocument = gql`
    mutation SubmitItems($items: [ID!]!) {
        createSubmission(items: $items) {
            items {
                count
            }
        }
    }
`
export function useSubmitItems(
    baseOptions?: MutationHookOptions<SubmitItemsMutation, SubmitItemsVariables>
) {
    return useApolloMutation<SubmitItemsMutation, SubmitItemsVariables>(
        SubmitItemsDocument,
        baseOptions
    )
}
export const UpdateItemSelectedCountDocument = gql`
    mutation UpdateItemSelectedCount($id: ID!, $selectedCount: Int!) {
        updateItemSelectedCount(id: $id, selectedCount: $selectedCount) @client
    }
`
export function useUpdateItemSelectedCount(
    baseOptions?: MutationHookOptions<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountVariables
    >
) {
    return useApolloMutation<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountVariables
    >(UpdateItemSelectedCountDocument, baseOptions)
}
