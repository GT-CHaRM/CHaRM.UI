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

export type MyZipCodeVariables = {}

export type MyZipCodeQuery = {
    __typename?: "Query"

    Me: Maybe<MyZipCodeMe>
}

export type MyZipCodeMe = {
    __typename?: "User"

    ZipCode: Maybe<string>
}

export type ItemsVariables = {}

export type ItemsQuery = {
    __typename?: "Query"

    Items: ItemsItems[]
}

export type ItemsItems = {
    __typename?: "ItemType"

    Id: string

    Name: string

    SelectedCount: number
}

export type ResetItemSelectedCountsVariables = {}

export type ResetItemSelectedCountsMutation = {
    __typename?: "Mutation"

    ResetItemSelectedCounts: boolean
}

export type SubmissionsVariables = {}

export type SubmissionsQuery = {
    __typename?: "Query"

    Submissions: SubmissionsSubmissions[]
}

export type SubmissionsSubmissions = {
    __typename?: "Submission"

    Id: string

    Items: SubmissionsItems[]

    Submitted: DateTimeOffset
}

export type SubmissionsItems = {
    __typename?: "ItemSubmissionBatch"

    Count: number

    Item: SubmissionsItem
}

export type SubmissionsItem = {
    __typename?: "ItemType"

    Id: string

    Name: string
}

export type SubmitItemsVariables = {
    Items: string[]
    ZipCode: string
}

export type SubmitItemsMutation = {
    __typename?: "Mutation"

    CreateSubmission: SubmitItemsCreateSubmission
}

export type SubmitItemsCreateSubmission = {
    __typename?: "Submission"

    Items: SubmitItemsItems[]
}

export type SubmitItemsItems = {
    __typename?: "ItemSubmissionBatch"

    Count: number
}

export type UpdateItemSelectedCountVariables = {
    Id: string
    SelectedCount: number
}

export type UpdateItemSelectedCountMutation = {
    __typename?: "Mutation"

    UpdateItemSelectedCount: number
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

export const MyZipCodeDocument = gql`
    query MyZipCode {
        Me {
            ZipCode
        }
    }
`
export function useMyZipCode(
    baseOptions?: QueryHookOptions<MyZipCodeVariables>
) {
    return useApolloQuery<MyZipCodeQuery, MyZipCodeVariables>(
        MyZipCodeDocument,
        baseOptions
    )
}
export const ItemsDocument = gql`
    query Items {
        Items {
            Id
            Name
            SelectedCount @client
        }
    }
`
export function useItems(baseOptions?: QueryHookOptions<ItemsVariables>) {
    return useApolloQuery<ItemsQuery, ItemsVariables>(
        ItemsDocument,
        baseOptions
    )
}
export const ResetItemSelectedCountsDocument = gql`
    mutation ResetItemSelectedCounts {
        ResetItemSelectedCounts @client
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
export const SubmissionsDocument = gql`
    query Submissions {
        Submissions {
            Id
            Items {
                Count
                Item {
                    Id
                    Name
                }
            }
            Submitted
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
    mutation SubmitItems($Items: [ID!]!, $ZipCode: String!) {
        CreateSubmission(Items: $Items, ZipCode: $ZipCode) {
            Items {
                Count
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
    mutation UpdateItemSelectedCount($Id: ID!, $SelectedCount: Int!) {
        UpdateItemSelectedCount(Id: $Id, SelectedCount: $SelectedCount) @client
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
