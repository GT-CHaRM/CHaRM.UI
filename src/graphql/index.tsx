type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC.
     * `DateTimeOffset` expects timestamps to be formatted in accordance with the
     * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
     */
    DateTimeOffset: any
    /** The `Date` scalar type represents a year, month and day in accordance with the
     * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
     */
    Date: Date
    /** The `DateTime` scalar type represents a date and time. `DateTime` expects
     * timestamps to be formatted in accordance with the
     * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
     */
    DateTime: any
    Decimal: number
    /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
    Milliseconds: number
    Object: any
    /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
    Seconds: number
}

/** A type that represents a unique submission for a specific item, including the item id and the count submitted. */
export type ItemSubmissionBatch = {
    /** The count of the item that was submitted. */
    readonly Count: Scalars["Int"]
    /** The item batch's unique GUID */
    readonly Id: Scalars["ID"]
    /** The item submitted */
    readonly Item: ItemType
}

/** A type that represents a specific acceptable item in our database. */
export type ItemType = {
    /** The item's description */
    readonly Description: Scalars["String"]
    /** The item's unique GUID */
    readonly Id: Scalars["ID"]
    /** The item's name */
    readonly Name: Scalars["String"]
    readonly SelectedCount: Scalars["Int"]
}

/** The mutations accepted in this GraphQL API. */
export type Mutation = {
    /** Changes the zip code of the current user */
    readonly ChangeMyPassword?: Maybe<User>
    /** Changes the zip code of the current user */
    readonly ChangeMyZipCode?: Maybe<User>
    /** Creates an employee account */
    readonly CreateEmployeeAccount?: Maybe<Scalars["String"]>
    /** Adds a new item that can be submitted */
    readonly CreateItem?: Maybe<ItemType>
    /** Adds a new submission for the current user */
    readonly CreateSubmissionSelf?: Maybe<Submission>
    /** Deletes the current account */
    readonly DeleteAccount?: Maybe<User>
    /** Deletes the current account */
    readonly DeleteMyAccount?: Maybe<User>
    /** Attempts to login with the provided username and password and returns a JSON web token (JWT) on success. */
    readonly LoginUser?: Maybe<Scalars["String"]>
    /** Modifies an existing item that can be submitted */
    readonly ModifyItem?: Maybe<ItemType>
    /** Modifies the contents of an existing submission */
    readonly ModifySubmission?: Maybe<Submission>
    /** Attempts to register with the provided information and returns a JSON web token (JWT) on success. */
    readonly RegisterUser?: Maybe<Scalars["String"]>
    /** Removes an existing submission */
    readonly RemoveSubmission?: Maybe<Submission>
    readonly ResetItemSelectedCounts: Scalars["Boolean"]
    readonly UpdateItemSelectedCount: Scalars["Int"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationChangeMyPasswordArgs = {
    NewPassword: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationChangeMyZipCodeArgs = {
    ZipCode: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationCreateEmployeeAccountArgs = {
    Email: Scalars["String"]
    Password: Scalars["String"]
    Username: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationCreateItemArgs = {
    Description: Scalars["String"]
    Name: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationCreateSubmissionSelfArgs = {
    Items: ReadonlyArray<Scalars["ID"]>
    ZipCode: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationDeleteAccountArgs = {
    Id: Scalars["ID"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationDeleteMyAccountArgs = {
    Password: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationLoginUserArgs = {
    Password: Scalars["String"]
    Username: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationModifyItemArgs = {
    Description: Scalars["String"]
    Id: Scalars["ID"]
    Name: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationModifySubmissionArgs = {
    Id: Scalars["ID"]
    Items: ReadonlyArray<Scalars["ID"]>
    Time: Scalars["DateTimeOffset"]
    ZipCode: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationRegisterUserArgs = {
    Email: Scalars["String"]
    Password: Scalars["String"]
    Username: Scalars["String"]
    ZipCode: Scalars["String"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationRemoveSubmissionArgs = {
    Id: Scalars["ID"]
}

/** The mutations accepted in this GraphQL API. */
export type MutationUpdateItemSelectedCountArgs = {
    Id: Scalars["ID"]
    SelectedCount: Scalars["Int"]
}

/** The queries accepted in this GraphQL API. */
export type Query = {
    /** List all submissions in the system */
    readonly AllSubmissions: ReadonlyArray<Submission>
    /** A single item identified by its GUID */
    readonly Item?: Maybe<ItemType>
    /** List of items available to submit */
    readonly Items: ReadonlyArray<ItemType>
    /** A single submission by the current user identified by its GUID */
    readonly MySubmission?: Maybe<Submission>
    /** List of all submissions by the current user */
    readonly MySubmissions: ReadonlyArray<Submission>
    /** The current user */
    readonly MyUser?: Maybe<User>
    /** A single submission identified by its GUID */
    readonly Submission?: Maybe<Submission>
}

/** The queries accepted in this GraphQL API. */
export type QueryItemArgs = {
    Id: Scalars["ID"]
}

/** The queries accepted in this GraphQL API. */
export type QueryMySubmissionArgs = {
    Id: Scalars["ID"]
}

/** The queries accepted in this GraphQL API. */
export type QuerySubmissionArgs = {
    Id: Scalars["ID"]
}

/** The list of items submitted in a single visit to CHaRM */
export type Submission = {
    /** The unique id of this submission */
    readonly Id: Scalars["ID"]
    /** The list of items (+ counts) submitted */
    readonly Items: ReadonlyArray<ItemSubmissionBatch>
    /** The date of submission */
    readonly Submitted: Scalars["DateTimeOffset"]
    /** The visitor who performed the submission */
    readonly Visitor: User
    /** The zip code of the visitor who performed the submission. */
    readonly ZipCode?: Maybe<Scalars["String"]>
}

/** A user registered with CHaRM */
export type User = {
    /** The user's email */
    readonly Email: Scalars["String"]
    /** The ID of the user */
    readonly Id: Scalars["ID"]
    /** The type of the user */
    readonly Type: UserType
    /** The user's unique username */
    readonly UserName: Scalars["String"]
    /** The user's zip code */
    readonly ZipCode: Scalars["String"]
}

/** A specific type of user */
export enum UserType {
    Visitor = "Visitor",
    Employee = "Employee",
    Administrator = "Administrator"
}
export type SelectedCountFragment = {readonly __typename?: "ItemType"} & Pick<
    ItemType,
    "SelectedCount"
>

export type LoginMutationVariables = {
    Username: Scalars["String"]
    Password: Scalars["String"]
}

export type LoginMutation = {readonly __typename?: "Mutation"} & Pick<
    Mutation,
    "LoginUser"
>

export type RegisterMutationVariables = {
    Username: Scalars["String"]
    Password: Scalars["String"]
    Email: Scalars["String"]
    ZipCode: Scalars["String"]
}

export type RegisterMutation = {readonly __typename?: "Mutation"} & Pick<
    Mutation,
    "RegisterUser"
>

export type RegisterEmployeeMutationVariables = {
    Username: Scalars["String"]
    Password: Scalars["String"]
    Email: Scalars["String"]
}

export type RegisterEmployeeMutation = {
    readonly __typename?: "Mutation"
} & Pick<Mutation, "CreateEmployeeAccount">

export type ResetItemSelectedCountsMutationVariables = {}

export type ResetItemSelectedCountsMutation = {
    readonly __typename?: "Mutation"
} & Pick<Mutation, "ResetItemSelectedCounts">

export type SubmitItemsMutationVariables = {
    Items: ReadonlyArray<Scalars["ID"]>
    ZipCode: Scalars["String"]
}

export type SubmitItemsMutation = {readonly __typename?: "Mutation"} & {
    readonly CreateSubmissionSelf: Maybe<
        {readonly __typename?: "Submission"} & Pick<
            Submission,
            "Id" | "Submitted"
        > & {
                readonly Items: ReadonlyArray<
                    {readonly __typename?: "ItemSubmissionBatch"} & Pick<
                        ItemSubmissionBatch,
                        "Count"
                    > & {
                            readonly Item: {
                                readonly __typename?: "ItemType"
                            } & Pick<ItemType, "Id" | "Name" | "Description">
                        }
                >
            }
    >
}

export type UpdateItemSelectedCountMutationVariables = {
    Id: Scalars["ID"]
    SelectedCount: Scalars["Int"]
}

export type UpdateItemSelectedCountMutation = {
    readonly __typename?: "Mutation"
} & Pick<Mutation, "UpdateItemSelectedCount">

export type RemoveSubmissionMutationVariables = {
    Id: Scalars["ID"]
}

export type RemoveSubmissionMutation = {readonly __typename?: "Mutation"} & {
    readonly RemoveSubmission: Maybe<
        {readonly __typename?: "Submission"} & Pick<Submission, "Id">
    >
}

export type ChangeMyZipMutationVariables = {
    ZipCode: Scalars["String"]
}

export type ChangeMyZipMutation = {readonly __typename?: "Mutation"} & {
    readonly ChangeMyZipCode: Maybe<
        {readonly __typename?: "User"} & Pick<User, "ZipCode">
    >
}

export type ChangeMyPasswordMutationVariables = {
    OldPassword: Scalars["String"]
    NewPassword: Scalars["String"]
}

export type ChangeMyPasswordMutation = {readonly __typename?: "Mutation"} & {
    readonly ChangeMyPassword: Maybe<
        {readonly __typename?: "User"} & Pick<User, "Id">
    >
}

export type UpdateExistingSubmissionMutationVariables = {
    Id: Scalars["ID"]
    Items: ReadonlyArray<Scalars["ID"]>
    Time: Scalars["DateTimeOffset"]
    ZipCode: Scalars["String"]
}

export type UpdateExistingSubmissionMutation = {
    readonly __typename?: "Mutation"
} & {
    readonly ModifySubmission: Maybe<
        {readonly __typename?: "Submission"} & Pick<
            Submission,
            "Id" | "Submitted" | "ZipCode"
        > & {
                readonly Items: ReadonlyArray<
                    {readonly __typename?: "ItemSubmissionBatch"} & Pick<
                        ItemSubmissionBatch,
                        "Id" | "Count"
                    > & {
                            readonly Item: {
                                readonly __typename?: "ItemType"
                            } & Pick<ItemType, "Id" | "Description" | "Name">
                        }
                >
            }
    >
}

export type DeleteMyAccountMutationVariables = {
    Password: Scalars["String"]
}

export type DeleteMyAccountMutation = {readonly __typename?: "Mutation"} & {
    readonly DeleteMyAccount: Maybe<
        {readonly __typename?: "User"} & Pick<User, "Id">
    >
}

export type MyUsernameQueryVariables = {}

export type MyUsernameQuery = {readonly __typename?: "Query"} & {
    readonly MyUser: Maybe<
        {readonly __typename?: "User"} & Pick<User, "UserName">
    >
}

export type MyZipCodeQueryVariables = {}

export type MyZipCodeQuery = {readonly __typename?: "Query"} & {
    readonly MyUser: Maybe<
        {readonly __typename?: "User"} & Pick<User, "ZipCode">
    >
}

export type MyUserTypeQueryVariables = {}

export type MyUserTypeQuery = {readonly __typename?: "Query"} & {
    readonly MyUser: Maybe<{readonly __typename?: "User"} & Pick<User, "Type">>
}

export type MyInformationQueryVariables = {}

export type MyInformationQuery = {readonly __typename?: "Query"} & {
    readonly MyUser: Maybe<
        {readonly __typename?: "User"} & Pick<User, "UserName" | "Type">
    >
}

export type ItemsQueryVariables = {}

export type ItemsQuery = {readonly __typename?: "Query"} & {
    readonly Items: ReadonlyArray<
        {readonly __typename?: "ItemType"} & Pick<
            ItemType,
            "Id" | "Name" | "Description" | "SelectedCount"
        >
    >
}

export type SubmissionsQueryVariables = {}

export type SubmissionsQuery = {readonly __typename?: "Query"} & {
    readonly MySubmissions: ReadonlyArray<
        {readonly __typename?: "Submission"} & Pick<
            Submission,
            "Id" | "Submitted"
        > & {
                readonly Items: ReadonlyArray<
                    {readonly __typename?: "ItemSubmissionBatch"} & Pick<
                        ItemSubmissionBatch,
                        "Count"
                    > & {
                            readonly Item: {
                                readonly __typename?: "ItemType"
                            } & Pick<ItemType, "Id" | "Name" | "Description">
                        }
                >
            }
    >
}

export type SubmissionQueryVariables = {
    Id: Scalars["ID"]
}

export type SubmissionQuery = {readonly __typename?: "Query"} & {
    readonly MySubmission: Maybe<
        {readonly __typename?: "Submission"} & Pick<
            Submission,
            "Id" | "Submitted"
        > & {
                readonly Items: ReadonlyArray<
                    {readonly __typename?: "ItemSubmissionBatch"} & Pick<
                        ItemSubmissionBatch,
                        "Count"
                    > & {
                            readonly Item: {
                                readonly __typename?: "ItemType"
                            } & Pick<ItemType, "Id" | "Name" | "Description">
                        }
                >
            }
    >
}

export type EmployeeSubmissionsQueryVariables = {}

export type EmployeeSubmissionsQuery = {readonly __typename?: "Query"} & {
    readonly AllSubmissions: ReadonlyArray<
        {readonly __typename?: "Submission"} & Pick<
            Submission,
            "Id" | "Submitted"
        > & {
                readonly Items: ReadonlyArray<
                    {readonly __typename?: "ItemSubmissionBatch"} & Pick<
                        ItemSubmissionBatch,
                        "Count"
                    > & {
                            readonly Item: {
                                readonly __typename?: "ItemType"
                            } & Pick<ItemType, "Id" | "Name">
                        }
                >
                readonly Visitor: {readonly __typename?: "User"} & Pick<
                    User,
                    "UserName"
                >
            }
    >
}
import {GraphQLContext} from "./context"

import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig
} from "graphql"

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
    resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
    TResult,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface DateScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["Date"], any> {
    name: "Date"
}

export interface DateTimeScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["DateTime"], any> {
    name: "DateTime"
}

export interface DateTimeOffsetScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["DateTimeOffset"], any> {
    name: "DateTimeOffset"
}

export interface DecimalScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["Decimal"], any> {
    name: "Decimal"
}

export type ItemSubmissionBatchResolvers<
    Context = GraphQLContext,
    ParentType = ItemSubmissionBatch
> = {
    Count?: Resolver<Scalars["Int"], ParentType, Context>
    Id?: Resolver<Scalars["ID"], ParentType, Context>
    Item?: Resolver<ItemType, ParentType, Context>
}

export type ItemTypeResolvers<
    Context = GraphQLContext,
    ParentType = ItemType
> = {
    Description?: Resolver<Scalars["String"], ParentType, Context>
    Id?: Resolver<Scalars["ID"], ParentType, Context>
    Name?: Resolver<Scalars["String"], ParentType, Context>
    SelectedCount?: Resolver<Scalars["Int"], ParentType, Context>
}

export interface MillisecondsScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["Milliseconds"], any> {
    name: "Milliseconds"
}

export type MutationResolvers<
    Context = GraphQLContext,
    ParentType = Mutation
> = {
    ChangeMyPassword?: Resolver<
        Maybe<User>,
        ParentType,
        Context,
        MutationChangeMyPasswordArgs
    >
    ChangeMyZipCode?: Resolver<
        Maybe<User>,
        ParentType,
        Context,
        MutationChangeMyZipCodeArgs
    >
    CreateEmployeeAccount?: Resolver<
        Maybe<Scalars["String"]>,
        ParentType,
        Context,
        MutationCreateEmployeeAccountArgs
    >
    CreateItem?: Resolver<
        Maybe<ItemType>,
        ParentType,
        Context,
        MutationCreateItemArgs
    >
    CreateSubmissionSelf?: Resolver<
        Maybe<Submission>,
        ParentType,
        Context,
        MutationCreateSubmissionSelfArgs
    >
    DeleteAccount?: Resolver<
        Maybe<User>,
        ParentType,
        Context,
        MutationDeleteAccountArgs
    >
    DeleteMyAccount?: Resolver<
        Maybe<User>,
        ParentType,
        Context,
        MutationDeleteMyAccountArgs
    >
    LoginUser?: Resolver<
        Maybe<Scalars["String"]>,
        ParentType,
        Context,
        MutationLoginUserArgs
    >
    ModifyItem?: Resolver<
        Maybe<ItemType>,
        ParentType,
        Context,
        MutationModifyItemArgs
    >
    ModifySubmission?: Resolver<
        Maybe<Submission>,
        ParentType,
        Context,
        MutationModifySubmissionArgs
    >
    RegisterUser?: Resolver<
        Maybe<Scalars["String"]>,
        ParentType,
        Context,
        MutationRegisterUserArgs
    >
    RemoveSubmission?: Resolver<
        Maybe<Submission>,
        ParentType,
        Context,
        MutationRemoveSubmissionArgs
    >
    ResetItemSelectedCounts?: Resolver<Scalars["Boolean"], ParentType, Context>
    UpdateItemSelectedCount?: Resolver<
        Scalars["Int"],
        ParentType,
        Context,
        MutationUpdateItemSelectedCountArgs
    >
}

export interface ObjectScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["Object"], any> {
    name: "Object"
}

export type QueryResolvers<Context = GraphQLContext, ParentType = Query> = {
    AllSubmissions?: Resolver<ReadonlyArray<Submission>, ParentType, Context>
    Item?: Resolver<Maybe<ItemType>, ParentType, Context, QueryItemArgs>
    Items?: Resolver<ReadonlyArray<ItemType>, ParentType, Context>
    MySubmission?: Resolver<
        Maybe<Submission>,
        ParentType,
        Context,
        QueryMySubmissionArgs
    >
    MySubmissions?: Resolver<ReadonlyArray<Submission>, ParentType, Context>
    MyUser?: Resolver<Maybe<User>, ParentType, Context>
    Submission?: Resolver<
        Maybe<Submission>,
        ParentType,
        Context,
        QuerySubmissionArgs
    >
}

export interface SecondsScalarConfig
    extends GraphQLScalarTypeConfig<Scalars["Seconds"], any> {
    name: "Seconds"
}

export type SubmissionResolvers<
    Context = GraphQLContext,
    ParentType = Submission
> = {
    Id?: Resolver<Scalars["ID"], ParentType, Context>
    Items?: Resolver<ReadonlyArray<ItemSubmissionBatch>, ParentType, Context>
    Submitted?: Resolver<Scalars["DateTimeOffset"], ParentType, Context>
    Visitor?: Resolver<User, ParentType, Context>
    ZipCode?: Resolver<Maybe<Scalars["String"]>, ParentType, Context>
}

export type UserResolvers<Context = GraphQLContext, ParentType = User> = {
    Email?: Resolver<Scalars["String"], ParentType, Context>
    Id?: Resolver<Scalars["ID"], ParentType, Context>
    Type?: Resolver<UserType, ParentType, Context>
    UserName?: Resolver<Scalars["String"], ParentType, Context>
    ZipCode?: Resolver<Scalars["String"], ParentType, Context>
}

export type Resolvers<Context = GraphQLContext> = {
    Date?: GraphQLScalarType
    DateTime?: GraphQLScalarType
    DateTimeOffset?: GraphQLScalarType
    Decimal?: GraphQLScalarType
    ItemSubmissionBatch?: ItemSubmissionBatchResolvers<Context>
    ItemType?: ItemTypeResolvers<Context>
    Milliseconds?: GraphQLScalarType
    Mutation?: MutationResolvers<Context>
    Object?: GraphQLScalarType
    Query?: QueryResolvers<Context>
    Seconds?: GraphQLScalarType
    Submission?: SubmissionResolvers<Context>
    User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = GraphQLContext> = Resolvers<Context>

import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"
export const SelectedCountFragmentDoc = gql`
    fragment SelectedCount on ItemType {
        SelectedCount @client
    }
`
export const LoginDocument = gql`
    mutation Login($Username: String!, $Password: String!) {
        LoginUser(Username: $Username, Password: $Password)
    }
`

export function useLoginMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        baseOptions
    )
}
export const RegisterDocument = gql`
    mutation Register(
        $Username: String!
        $Password: String!
        $Email: String!
        $ZipCode: String!
    ) {
        RegisterUser(
            Username: $Username
            Password: $Password
            Email: $Email
            ZipCode: $ZipCode
        )
    }
`

export function useRegisterMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        RegisterMutation,
        RegisterMutationVariables
    >(RegisterDocument, baseOptions)
}
export const RegisterEmployeeDocument = gql`
    mutation RegisterEmployee(
        $Username: String!
        $Password: String!
        $Email: String!
    ) {
        CreateEmployeeAccount(
            Username: $Username
            Password: $Password
            Email: $Email
        )
    }
`

export function useRegisterEmployeeMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        RegisterEmployeeMutation,
        RegisterEmployeeMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        RegisterEmployeeMutation,
        RegisterEmployeeMutationVariables
    >(RegisterEmployeeDocument, baseOptions)
}
export const ResetItemSelectedCountsDocument = gql`
    mutation ResetItemSelectedCounts {
        ResetItemSelectedCounts @client
    }
`

export function useResetItemSelectedCountsMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsMutationVariables
    >(ResetItemSelectedCountsDocument, baseOptions)
}
export const SubmitItemsDocument = gql`
    mutation SubmitItems($Items: [ID!]!, $ZipCode: String!) {
        CreateSubmissionSelf(Items: $Items, ZipCode: $ZipCode) {
            Id
            Items {
                Count
                Item {
                    Id
                    Name
                    Description
                }
            }
            Submitted
        }
    }
`

export function useSubmitItemsMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        SubmitItemsMutation,
        SubmitItemsMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        SubmitItemsMutation,
        SubmitItemsMutationVariables
    >(SubmitItemsDocument, baseOptions)
}
export const UpdateItemSelectedCountDocument = gql`
    mutation UpdateItemSelectedCount($Id: ID!, $SelectedCount: Int!) {
        UpdateItemSelectedCount(Id: $Id, SelectedCount: $SelectedCount) @client
    }
`

export function useUpdateItemSelectedCountMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountMutationVariables
    >(UpdateItemSelectedCountDocument, baseOptions)
}
export const RemoveSubmissionDocument = gql`
    mutation RemoveSubmission($Id: ID!) {
        RemoveSubmission(Id: $Id) {
            Id
        }
    }
`

export function useRemoveSubmissionMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        RemoveSubmissionMutation,
        RemoveSubmissionMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        RemoveSubmissionMutation,
        RemoveSubmissionMutationVariables
    >(RemoveSubmissionDocument, baseOptions)
}
export const ChangeMyZipDocument = gql`
    mutation ChangeMyZip($ZipCode: String!) {
        ChangeMyZipCode(ZipCode: $ZipCode) {
            ZipCode
        }
    }
`

export function useChangeMyZipMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        ChangeMyZipMutation,
        ChangeMyZipMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        ChangeMyZipMutation,
        ChangeMyZipMutationVariables
    >(ChangeMyZipDocument, baseOptions)
}
export const ChangeMyPasswordDocument = gql`
    mutation ChangeMyPassword($OldPassword: String!, $NewPassword: String!) {
        ChangeMyPassword(NewPassword: $NewPassword) {
            Id
        }
    }
`

export function useChangeMyPasswordMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        ChangeMyPasswordMutation,
        ChangeMyPasswordMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        ChangeMyPasswordMutation,
        ChangeMyPasswordMutationVariables
    >(ChangeMyPasswordDocument, baseOptions)
}
export const UpdateExistingSubmissionDocument = gql`
    mutation UpdateExistingSubmission(
        $Id: ID!
        $Items: [ID!]!
        $Time: DateTimeOffset!
        $ZipCode: String!
    ) {
        ModifySubmission(
            Id: $Id
            Items: $Items
            Time: $Time
            ZipCode: $ZipCode
        ) {
            Id
            Submitted
            ZipCode
            Items {
                Id
                Count
                Item {
                    Id
                    Description
                    Name
                }
            }
        }
    }
`

export function useUpdateExistingSubmissionMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        UpdateExistingSubmissionMutation,
        UpdateExistingSubmissionMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        UpdateExistingSubmissionMutation,
        UpdateExistingSubmissionMutationVariables
    >(UpdateExistingSubmissionDocument, baseOptions)
}
export const DeleteMyAccountDocument = gql`
    mutation DeleteMyAccount($Password: String!) {
        DeleteMyAccount(Password: $Password) {
            Id
        }
    }
`

export function useDeleteMyAccountMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        DeleteMyAccountMutation,
        DeleteMyAccountMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        DeleteMyAccountMutation,
        DeleteMyAccountMutationVariables
    >(DeleteMyAccountDocument, baseOptions)
}
export const MyUsernameDocument = gql`
    query MyUsername {
        MyUser {
            UserName
        }
    }
`

export function useMyUsernameQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyUsernameQueryVariables>
) {
    return ReactApolloHooks.useQuery<MyUsernameQuery, MyUsernameQueryVariables>(
        MyUsernameDocument,
        baseOptions
    )
}
export const MyZipCodeDocument = gql`
    query MyZipCode {
        MyUser {
            ZipCode
        }
    }
`

export function useMyZipCodeQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyZipCodeQueryVariables>
) {
    return ReactApolloHooks.useQuery<MyZipCodeQuery, MyZipCodeQueryVariables>(
        MyZipCodeDocument,
        baseOptions
    )
}
export const MyUserTypeDocument = gql`
    query MyUserType {
        MyUser {
            Type
        }
    }
`

export function useMyUserTypeQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyUserTypeQueryVariables>
) {
    return ReactApolloHooks.useQuery<MyUserTypeQuery, MyUserTypeQueryVariables>(
        MyUserTypeDocument,
        baseOptions
    )
}
export const MyInformationDocument = gql`
    query MyInformation {
        MyUser {
            UserName
            Type
        }
    }
`

export function useMyInformationQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyInformationQueryVariables>
) {
    return ReactApolloHooks.useQuery<
        MyInformationQuery,
        MyInformationQueryVariables
    >(MyInformationDocument, baseOptions)
}
export const ItemsDocument = gql`
    query Items {
        Items {
            Id
            Name
            Description
            SelectedCount @client
        }
    }
`

export function useItemsQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<ItemsQueryVariables>
) {
    return ReactApolloHooks.useQuery<ItemsQuery, ItemsQueryVariables>(
        ItemsDocument,
        baseOptions
    )
}
export const SubmissionsDocument = gql`
    query Submissions {
        MySubmissions {
            Id
            Items {
                Count
                Item {
                    Id
                    Name
                    Description
                }
            }
            Submitted
        }
    }
`

export function useSubmissionsQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<SubmissionsQueryVariables>
) {
    return ReactApolloHooks.useQuery<
        SubmissionsQuery,
        SubmissionsQueryVariables
    >(SubmissionsDocument, baseOptions)
}
export const SubmissionDocument = gql`
    query Submission($Id: ID!) {
        MySubmission(Id: $Id) {
            Id
            Items {
                Count
                Item {
                    Id
                    Name
                    Description
                }
            }
            Submitted
        }
    }
`

export function useSubmissionQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<SubmissionQueryVariables>
) {
    return ReactApolloHooks.useQuery<SubmissionQuery, SubmissionQueryVariables>(
        SubmissionDocument,
        baseOptions
    )
}
export const EmployeeSubmissionsDocument = gql`
    query EmployeeSubmissions {
        AllSubmissions {
            Id
            Items {
                Count
                Item {
                    Id
                    Name
                }
            }
            Visitor {
                UserName
            }
            Submitted
        }
    }
`

export function useEmployeeSubmissionsQuery(
    baseOptions?: ReactApolloHooks.QueryHookOptions<
        EmployeeSubmissionsQueryVariables
    >
) {
    return ReactApolloHooks.useQuery<
        EmployeeSubmissionsQuery,
        EmployeeSubmissionsQueryVariables
    >(EmployeeSubmissionsDocument, baseOptions)
}
export interface IntrospectionResultData {
    __schema: {
        types: {
            kind: string
            name: string
            possibleTypes: {
                name: string
            }[]
        }[]
    }
}

const result: IntrospectionResultData = {
    __schema: {
        types: []
    }
}

export default result
