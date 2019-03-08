export type Maybe<T> = T | null

export enum UserType {
    Visitor = "Visitor",
    Employee = "Employee",
    Administrator = "Administrator"
}

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

export type LoginMutationVariables = {
    Username: string
    Password: string
}

export type LoginMutationMutation = {
    __typename?: "Mutation"

    Login: Maybe<string>
}

export type RegisterMutationVariables = {
    Username: string
    Password: string
    Email: string
}

export type RegisterMutationMutation = {
    __typename?: "Mutation"

    Register: Maybe<string>
}

export type ResetItemSelectedCountsVariables = {}

export type ResetItemSelectedCountsMutation = {
    __typename?: "Mutation"

    ResetItemSelectedCounts: boolean
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

export type MyUsernameVariables = {}

export type MyUsernameQuery = {
    __typename?: "Query"

    Me: Maybe<MyUsernameMe>
}

export type MyUsernameMe = {
    __typename?: "User"

    UserName: string
}

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

export type MyUserTypeVariables = {}

export type MyUserTypeQuery = {
    __typename?: "Query"

    Me: Maybe<MyUserTypeMe>
}

export type MyUserTypeMe = {
    __typename?: "User"

    Type: UserType
}

import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig
} from "graphql"
import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"
import {GraphQLContext} from "./context"

// ====================================================
// Components
// ====================================================

export const LoginMutationDocument = gql`
    mutation LoginMutation($Username: String!, $Password: String!) {
        Login(Username: $Username, Password: $Password)
    }
`
export function useLoginMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        LoginMutationMutation,
        LoginMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        LoginMutationMutation,
        LoginMutationVariables
    >(LoginMutationDocument, baseOptions)
}
export const RegisterMutationDocument = gql`
    mutation RegisterMutation(
        $Username: String!
        $Password: String!
        $Email: String!
    ) {
        Register(Username: $Username, Password: $Password, Email: $Email)
    }
`
export function useRegisterMutation(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        RegisterMutationMutation,
        RegisterMutationVariables
    >
) {
    return ReactApolloHooks.useMutation<
        RegisterMutationMutation,
        RegisterMutationVariables
    >(RegisterMutationDocument, baseOptions)
}
export const ResetItemSelectedCountsDocument = gql`
    mutation ResetItemSelectedCounts {
        ResetItemSelectedCounts @client
    }
`
export function useResetItemSelectedCounts(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsVariables
    >
) {
    return ReactApolloHooks.useMutation<
        ResetItemSelectedCountsMutation,
        ResetItemSelectedCountsVariables
    >(ResetItemSelectedCountsDocument, baseOptions)
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
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        SubmitItemsMutation,
        SubmitItemsVariables
    >
) {
    return ReactApolloHooks.useMutation<
        SubmitItemsMutation,
        SubmitItemsVariables
    >(SubmitItemsDocument, baseOptions)
}
export const UpdateItemSelectedCountDocument = gql`
    mutation UpdateItemSelectedCount($Id: ID!, $SelectedCount: Int!) {
        UpdateItemSelectedCount(Id: $Id, SelectedCount: $SelectedCount) @client
    }
`
export function useUpdateItemSelectedCount(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountVariables
    >
) {
    return ReactApolloHooks.useMutation<
        UpdateItemSelectedCountMutation,
        UpdateItemSelectedCountVariables
    >(UpdateItemSelectedCountDocument, baseOptions)
}
export const MyUsernameDocument = gql`
    query MyUsername {
        Me {
            UserName
        }
    }
`
export function useMyUsername(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyUsernameVariables>
) {
    return ReactApolloHooks.useQuery<MyUsernameQuery, MyUsernameVariables>(
        MyUsernameDocument,
        baseOptions
    )
}
export const MyZipCodeDocument = gql`
    query MyZipCode {
        Me {
            ZipCode
        }
    }
`
export function useMyZipCode(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyZipCodeVariables>
) {
    return ReactApolloHooks.useQuery<MyZipCodeQuery, MyZipCodeVariables>(
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
export function useItems(
    baseOptions?: ReactApolloHooks.QueryHookOptions<ItemsVariables>
) {
    return ReactApolloHooks.useQuery<ItemsQuery, ItemsVariables>(
        ItemsDocument,
        baseOptions
    )
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
    baseOptions?: ReactApolloHooks.QueryHookOptions<SubmissionsVariables>
) {
    return ReactApolloHooks.useQuery<SubmissionsQuery, SubmissionsVariables>(
        SubmissionsDocument,
        baseOptions
    )
}
export const MyUserTypeDocument = gql`
    query MyUserType {
        Me {
            Type
        }
    }
`
export function useMyUserType(
    baseOptions?: ReactApolloHooks.QueryHookOptions<MyUserTypeVariables>
) {
    return ReactApolloHooks.useQuery<MyUserTypeQuery, MyUserTypeVariables>(
        MyUserTypeDocument,
        baseOptions
    )
}

/*
 * This function is incomplete, I have no idea what I'm doing.
 */

// export function useRemoveSubmissionMutation(
//     baseOptions?: ReactApolloHooks.MutationHookOptions<
//         RemoveSubmissionMutation,
//         RemoveSubmissionVariables
//     >
// ) {
//     return ReactApolloHooks.useMutation<
//         RemoveItems,
//         SubmitItemsVariables
//     >(SubmitItemsDocument, baseOptions)
// }

// )

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
    Item: ItemType
    /** List of items available to submit */
    Items: ItemType[]

    Me?: Maybe<User>

    Submission: Submission

    Submissions: Submission[]
}

export interface ItemType {
    Id: string

    Name: string

    SelectedCount: number
}

export interface User {
    NormalizedEmail: string

    Submissions: Submission[]

    Type: UserType

    UserName: string

    ZipCode?: Maybe<string>
}

export interface Submission {
    Id: string

    Items: ItemSubmissionBatch[]

    Submitted: DateTimeOffset

    ZipCode?: Maybe<string>
}

export interface ItemSubmissionBatch {
    Count: number

    Id: string

    Item: ItemType
}

export interface Mutation {
    CreateItem: ItemType

    CreateSubmission: Submission

    Login?: Maybe<string>

    Register?: Maybe<string>

    ResetItemSelectedCounts: boolean

    UpdateItemSelectedCount: number
}

// ====================================================
// Arguments
// ====================================================

export interface ItemQueryArgs {
    Id: string
}
export interface SubmissionQueryArgs {
    Id: string
}
export interface CreateItemMutationArgs {
    Name: string
}
export interface CreateSubmissionMutationArgs {
    Items: string[]

    ZipCode: string
}
export interface LoginMutationArgs {
    Password: string

    Username: string
}
export interface RegisterMutationArgs {
    Email: string

    Password: string

    Username: string
}
export interface UpdateItemSelectedCountMutationArgs {
    Id: string

    SelectedCount: number
}

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
    parent: Parent,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<Result> | Result

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
    subscribe<R = Result, P = Parent>(
        parent: P,
        args: Args,
        context: TContext,
        info: GraphQLResolveInfo
    ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>
    resolve?<R = Result, P = Parent>(
        parent: P,
        args: Args,
        context: TContext,
        info: GraphQLResolveInfo
    ): R | Result | Promise<R | Result>
}

export type SubscriptionResolver<
    Result,
    Parent = {},
    TContext = {},
    Args = {}
> =
    | ((
          ...args: any[]
      ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
    | ISubscriptionResolverObject<Result, Parent, TContext, Args>

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
    parent: Parent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<Types>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
    next: NextResolverFn<TResult>,
    source: any,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface QueryResolvers<TContext = GraphQLContext, TypeParent = {}> {
    Item?: QueryItemResolver<ItemType, TypeParent, TContext>
    /** List of items available to submit */
    Items?: QueryItemsResolver<ItemType[], TypeParent, TContext>

    Me?: QueryMeResolver<Maybe<User>, TypeParent, TContext>

    Submission?: QuerySubmissionResolver<Submission, TypeParent, TContext>

    Submissions?: QuerySubmissionsResolver<Submission[], TypeParent, TContext>
}

export type QueryItemResolver<
    R = ItemType,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, QueryItemArgs>
export interface QueryItemArgs {
    Id: string
}

export type QueryItemsResolver<
    R = ItemType[],
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type QueryMeResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type QuerySubmissionResolver<
    R = Submission,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, QuerySubmissionArgs>
export interface QuerySubmissionArgs {
    Id: string
}

export type QuerySubmissionsResolver<
    R = Submission[],
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface ItemTypeResolvers<
    TContext = GraphQLContext,
    TypeParent = ItemType
> {
    Id?: ItemTypeIdResolver<string, TypeParent, TContext>

    Name?: ItemTypeNameResolver<string, TypeParent, TContext>

    SelectedCount?: ItemTypeSelectedCountResolver<number, TypeParent, TContext>
}

export type ItemTypeIdResolver<
    R = string,
    Parent = ItemType,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type ItemTypeNameResolver<
    R = string,
    Parent = ItemType,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type ItemTypeSelectedCountResolver<
    R = number,
    Parent = ItemType,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface UserResolvers<TContext = GraphQLContext, TypeParent = User> {
    NormalizedEmail?: UserNormalizedEmailResolver<string, TypeParent, TContext>

    Submissions?: UserSubmissionsResolver<Submission[], TypeParent, TContext>

    Type?: UserTypeResolver<UserType, TypeParent, TContext>

    UserName?: UserUserNameResolver<string, TypeParent, TContext>

    ZipCode?: UserZipCodeResolver<Maybe<string>, TypeParent, TContext>
}

export type UserNormalizedEmailResolver<
    R = string,
    Parent = User,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type UserSubmissionsResolver<
    R = Submission[],
    Parent = User,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type UserTypeResolver<
    R = UserType,
    Parent = User,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type UserUserNameResolver<
    R = string,
    Parent = User,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type UserZipCodeResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface SubmissionResolvers<
    TContext = GraphQLContext,
    TypeParent = Submission
> {
    Id?: SubmissionIdResolver<string, TypeParent, TContext>

    Items?: SubmissionItemsResolver<ItemSubmissionBatch[], TypeParent, TContext>

    Submitted?: SubmissionSubmittedResolver<
        DateTimeOffset,
        TypeParent,
        TContext
    >

    ZipCode?: SubmissionZipCodeResolver<Maybe<string>, TypeParent, TContext>
}

export type SubmissionIdResolver<
    R = string,
    Parent = Submission,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type SubmissionItemsResolver<
    R = ItemSubmissionBatch[],
    Parent = Submission,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type SubmissionSubmittedResolver<
    R = DateTimeOffset,
    Parent = Submission,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type SubmissionZipCodeResolver<
    R = Maybe<string>,
    Parent = Submission,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface ItemSubmissionBatchResolvers<
    TContext = GraphQLContext,
    TypeParent = ItemSubmissionBatch
> {
    Count?: ItemSubmissionBatchCountResolver<number, TypeParent, TContext>

    Id?: ItemSubmissionBatchIdResolver<string, TypeParent, TContext>

    Item?: ItemSubmissionBatchItemResolver<ItemType, TypeParent, TContext>
}

export type ItemSubmissionBatchCountResolver<
    R = number,
    Parent = ItemSubmissionBatch,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type ItemSubmissionBatchIdResolver<
    R = string,
    Parent = ItemSubmissionBatch,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type ItemSubmissionBatchItemResolver<
    R = ItemType,
    Parent = ItemSubmissionBatch,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface MutationResolvers<TContext = GraphQLContext, TypeParent = {}> {
    CreateItem?: MutationCreateItemResolver<ItemType, TypeParent, TContext>

    CreateSubmission?: MutationCreateSubmissionResolver<
        Submission,
        TypeParent,
        TContext
    >

    Login?: MutationLoginResolver<Maybe<string>, TypeParent, TContext>

    Register?: MutationRegisterResolver<Maybe<string>, TypeParent, TContext>

    ResetItemSelectedCounts?: MutationResetItemSelectedCountsResolver<
        boolean,
        TypeParent,
        TContext
    >

    UpdateItemSelectedCount?: MutationUpdateItemSelectedCountResolver<
        number,
        TypeParent,
        TContext
    >
}

export type MutationCreateItemResolver<
    R = ItemType,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, MutationCreateItemArgs>
export interface MutationCreateItemArgs {
    Name: string
}

export type MutationCreateSubmissionResolver<
    R = Submission,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, MutationCreateSubmissionArgs>
export interface MutationCreateSubmissionArgs {
    Items: string[]

    ZipCode: string
}

export type MutationLoginResolver<
    R = Maybe<string>,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, MutationLoginArgs>
export interface MutationLoginArgs {
    Password: string

    Username: string
}

export type MutationRegisterResolver<
    R = Maybe<string>,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, MutationRegisterArgs>
export interface MutationRegisterArgs {
    Email: string

    Password: string

    Username: string
}

export type MutationResetItemSelectedCountsResolver<
    R = boolean,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type MutationUpdateItemSelectedCountResolver<
    R = number,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, MutationUpdateItemSelectedCountArgs>
export interface MutationUpdateItemSelectedCountArgs {
    Id: string

    SelectedCount: number
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
    Result,
    SkipDirectiveArgs,
    GraphQLContext
>
export interface SkipDirectiveArgs {
    /** Skipped when true. */
    if: boolean
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
    Result,
    IncludeDirectiveArgs,
    GraphQLContext
>
export interface IncludeDirectiveArgs {
    /** Included when true. */
    if: boolean
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
    Result,
    DeprecatedDirectiveArgs,
    GraphQLContext
>
export interface DeprecatedDirectiveArgs {
    /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
    reason?: string
}

export interface DateTimeOffsetScalarConfig
    extends GraphQLScalarTypeConfig<DateTimeOffset, any> {
    name: "DateTimeOffset"
}
export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
    name: "Date"
}
export interface DateTimeScalarConfig
    extends GraphQLScalarTypeConfig<DateTime, any> {
    name: "DateTime"
}
export interface DecimalScalarConfig
    extends GraphQLScalarTypeConfig<Decimal, any> {
    name: "Decimal"
}
export interface MillisecondsScalarConfig
    extends GraphQLScalarTypeConfig<Milliseconds, any> {
    name: "Milliseconds"
}
export interface SecondsScalarConfig
    extends GraphQLScalarTypeConfig<Seconds, any> {
    name: "Seconds"
}

export type IResolvers<TContext = GraphQLContext> = {
    Query?: QueryResolvers<TContext>
    ItemType?: ItemTypeResolvers<TContext>
    User?: UserResolvers<TContext>
    Submission?: SubmissionResolvers<TContext>
    ItemSubmissionBatch?: ItemSubmissionBatchResolvers<TContext>
    Mutation?: MutationResolvers<TContext>
    DateTimeOffset?: GraphQLScalarType
    Date?: GraphQLScalarType
    DateTime?: GraphQLScalarType
    Decimal?: GraphQLScalarType
    Milliseconds?: GraphQLScalarType
    Seconds?: GraphQLScalarType
} & {
    [typeName: string]: {
        [fieldName: string]:
            | Resolver<any, any, TContext, any>
            | SubscriptionResolver<any, any, TContext, any>
    }
}

export type IDirectiveResolvers<Result, TContext = GraphQLContext> = {
    skip?: SkipDirectiveResolver<Result>
    include?: IncludeDirectiveResolver<Result>
    deprecated?: DeprecatedDirectiveResolver<Result>
} & {[directiveName: string]: DirectiveResolverFn<any, any, TContext>}
