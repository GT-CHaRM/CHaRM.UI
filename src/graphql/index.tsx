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

import gql from "graphql-tag"

// ====================================================
// Components
// ====================================================

export const CurrentTabDocument = gql`
    query CurrentTab {
        currentTab @client
    }
`
export class CurrentTabComponent extends React.Component<
    Partial<ReactApollo.QueryProps<CurrentTabQuery, CurrentTabVariables>>
> {
    render() {
        return (
            <ReactApollo.Query<CurrentTabQuery, CurrentTabVariables>
                query={CurrentTabDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type CurrentTabProps<TChildProps = any> = Partial<
    ReactApollo.DataProps<CurrentTabQuery, CurrentTabVariables>
> &
    TChildProps
export function CurrentTabHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              CurrentTabQuery,
              CurrentTabVariables,
              CurrentTabProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        CurrentTabQuery,
        CurrentTabVariables,
        CurrentTabProps<TChildProps>
    >(CurrentTabDocument, operationOptions)
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
export class ItemsComponent extends React.Component<
    Partial<ReactApollo.QueryProps<ItemsQuery, ItemsVariables>>
> {
    render() {
        return (
            <ReactApollo.Query<ItemsQuery, ItemsVariables>
                query={ItemsDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type ItemsProps<TChildProps = any> = Partial<
    ReactApollo.DataProps<ItemsQuery, ItemsVariables>
> &
    TChildProps
export function ItemsHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              ItemsQuery,
              ItemsVariables,
              ItemsProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        ItemsQuery,
        ItemsVariables,
        ItemsProps<TChildProps>
    >(ItemsDocument, operationOptions)
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
export class NewItemComponent extends React.Component<
    Partial<ReactApollo.MutationProps<NewItemMutation, NewItemVariables>>
> {
    render() {
        return (
            <ReactApollo.Mutation<NewItemMutation, NewItemVariables>
                mutation={NewItemDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type NewItemProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<NewItemMutation, NewItemVariables>
> &
    TChildProps
export type NewItemMutationFn = ReactApollo.MutationFn<
    NewItemMutation,
    NewItemVariables
>
export function NewItemHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              NewItemMutation,
              NewItemVariables,
              NewItemProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        NewItemMutation,
        NewItemVariables,
        NewItemProps<TChildProps>
    >(NewItemDocument, operationOptions)
}
export const ResetItemSelectedCountsDocument = gql`
    mutation ResetItemSelectedCounts {
        resetItemSelectedCounts @client
    }
`
export class ResetItemSelectedCountsComponent extends React.Component<
    Partial<
        ReactApollo.MutationProps<
            ResetItemSelectedCountsMutation,
            ResetItemSelectedCountsVariables
        >
    >
> {
    render() {
        return (
            <ReactApollo.Mutation<
                ResetItemSelectedCountsMutation,
                ResetItemSelectedCountsVariables
            >
                mutation={ResetItemSelectedCountsDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type ResetItemSelectedCountsProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsVariables
    >
> &
    TChildProps
export type ResetItemSelectedCountsMutationFn = ReactApollo.MutationFn<
    ResetItemSelectedCountsMutation,
    ResetItemSelectedCountsVariables
>
export function ResetItemSelectedCountsHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              ResetItemSelectedCountsMutation,
              ResetItemSelectedCountsVariables,
              ResetItemSelectedCountsProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsVariables,
        ResetItemSelectedCountsProps<TChildProps>
    >(ResetItemSelectedCountsDocument, operationOptions)
}
export const SetCurrentTabDocument = gql`
    mutation SetCurrentTab($tab: Int!) {
        setCurrentTab(tab: $tab) @client
    }
`
export class SetCurrentTabComponent extends React.Component<
    Partial<
        ReactApollo.MutationProps<SetCurrentTabMutation, SetCurrentTabVariables>
    >
> {
    render() {
        return (
            <ReactApollo.Mutation<SetCurrentTabMutation, SetCurrentTabVariables>
                mutation={SetCurrentTabDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type SetCurrentTabProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<SetCurrentTabMutation, SetCurrentTabVariables>
> &
    TChildProps
export type SetCurrentTabMutationFn = ReactApollo.MutationFn<
    SetCurrentTabMutation,
    SetCurrentTabVariables
>
export function SetCurrentTabHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              SetCurrentTabMutation,
              SetCurrentTabVariables,
              SetCurrentTabProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        SetCurrentTabMutation,
        SetCurrentTabVariables,
        SetCurrentTabProps<TChildProps>
    >(SetCurrentTabDocument, operationOptions)
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
export class SubmissionsComponent extends React.Component<
    Partial<ReactApollo.QueryProps<SubmissionsQuery, SubmissionsVariables>>
> {
    render() {
        return (
            <ReactApollo.Query<SubmissionsQuery, SubmissionsVariables>
                query={SubmissionsDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type SubmissionsProps<TChildProps = any> = Partial<
    ReactApollo.DataProps<SubmissionsQuery, SubmissionsVariables>
> &
    TChildProps
export function SubmissionsHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              SubmissionsQuery,
              SubmissionsVariables,
              SubmissionsProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        SubmissionsQuery,
        SubmissionsVariables,
        SubmissionsProps<TChildProps>
    >(SubmissionsDocument, operationOptions)
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
export class SubmitItemsComponent extends React.Component<
    Partial<
        ReactApollo.MutationProps<SubmitItemsMutation, SubmitItemsVariables>
    >
> {
    render() {
        return (
            <ReactApollo.Mutation<SubmitItemsMutation, SubmitItemsVariables>
                mutation={SubmitItemsDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type SubmitItemsProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<SubmitItemsMutation, SubmitItemsVariables>
> &
    TChildProps
export type SubmitItemsMutationFn = ReactApollo.MutationFn<
    SubmitItemsMutation,
    SubmitItemsVariables
>
export function SubmitItemsHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              SubmitItemsMutation,
              SubmitItemsVariables,
              SubmitItemsProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        SubmitItemsMutation,
        SubmitItemsVariables,
        SubmitItemsProps<TChildProps>
    >(SubmitItemsDocument, operationOptions)
}
export const UpdateItemSelectedCountDocument = gql`
    mutation UpdateItemSelectedCount($id: ID!, $selectedCount: Int!) {
        updateItemSelectedCount(id: $id, selectedCount: $selectedCount) @client
    }
`
export class UpdateItemSelectedCountComponent extends React.Component<
    Partial<
        ReactApollo.MutationProps<
            UpdateItemSelectedCountMutation,
            UpdateItemSelectedCountVariables
        >
    >
> {
    render() {
        return (
            <ReactApollo.Mutation<
                UpdateItemSelectedCountMutation,
                UpdateItemSelectedCountVariables
            >
                mutation={UpdateItemSelectedCountDocument}
                {...(this as any)["props"] as any}
            />
        )
    }
}
export type UpdateItemSelectedCountProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountVariables
    >
> &
    TChildProps
export type UpdateItemSelectedCountMutationFn = ReactApollo.MutationFn<
    UpdateItemSelectedCountMutation,
    UpdateItemSelectedCountVariables
>
export function UpdateItemSelectedCountHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              UpdateItemSelectedCountMutation,
              UpdateItemSelectedCountVariables,
              UpdateItemSelectedCountProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountVariables,
        UpdateItemSelectedCountProps<TChildProps>
    >(UpdateItemSelectedCountDocument, operationOptions)
}
