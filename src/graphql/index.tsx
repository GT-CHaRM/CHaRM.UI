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

export type LoginVariables = {
    Username: string
    Password: string
}

export type LoginMutation = {
    __typename?: "Mutation"

    User: LoginUser
}

export type LoginUser = {
    __typename?: "UserMutation"

    Login: Maybe<string>
}

export type RegisterVariables = {
    Username: string
    Password: string
    Email: string
}

export type RegisterMutation = {
    __typename?: "Mutation"

    User: RegisterUser
}

export type RegisterUser = {
    __typename?: "UserMutation"

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

    Submission: SubmitItemsSubmission
}

export type SubmitItemsSubmission = {
    __typename?: "SubmissionMutation"

    CreateSelf: Maybe<SubmitItemsCreateSelf>
}

export type SubmitItemsCreateSelf = {
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

export type RemoveSubmissionVariables = {
    Id: string
}

export type RemoveSubmissionMutation = {
    __typename?: "Mutation"

    Submission: RemoveSubmissionSubmission
}

export type RemoveSubmissionSubmission = {
    __typename?: "SubmissionMutation"

    Remove: Maybe<RemoveSubmissionRemove>
}

export type RemoveSubmissionRemove = {
    __typename?: "Submission"

    Id: string
}

export type MyUsernameVariables = {}

export type MyUsernameQuery = {
    __typename?: "Query"

    User: MyUsernameUser
}

export type MyUsernameUser = {
    __typename?: "UserQuery"

    Me: Maybe<MyUsernameMe>
}

export type MyUsernameMe = {
    __typename?: "User"

    UserName: string
}

export type MyZipCodeVariables = {}

export type MyZipCodeQuery = {
    __typename?: "Query"

    User: MyZipCodeUser
}

export type MyZipCodeUser = {
    __typename?: "UserQuery"

    Me: Maybe<MyZipCodeMe>
}

export type MyZipCodeMe = {
    __typename?: "User"

    ZipCode: Maybe<string>
}

export type MyUserTypeVariables = {}

export type MyUserTypeQuery = {
    __typename?: "Query"

    User: MyUserTypeUser
}

export type MyUserTypeUser = {
    __typename?: "UserQuery"

    Me: Maybe<MyUserTypeMe>
}

export type MyUserTypeMe = {
    __typename?: "User"

    Type: UserType
}

export type ItemsVariables = {}

export type ItemsQuery = {
    __typename?: "Query"

    Item: ItemsItem
}

export type ItemsItem = {
    __typename?: "ItemQuery"

    All: ItemsAll[]
}

export type ItemsAll = {
    __typename?: "ItemType"

    Id: string

    Name: string

    SelectedCount: number
}

export type SubmissionsVariables = {}

export type SubmissionsQuery = {
    __typename?: "Query"

    Submission: SubmissionsSubmission
}

export type SubmissionsSubmission = {
    __typename?: "SubmissionQuery"

    AllMine: SubmissionsAllMine[]
}

export type SubmissionsAllMine = {
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

import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"

// ====================================================
// Components
// ====================================================

export const LoginDocument = gql`
    mutation Login($Username: String!, $Password: String!) {
        User {
            Login(Username: $Username, Password: $Password)
        }
    }
`
export function useLogin(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        LoginMutation,
        LoginVariables
    >
) {
    return ReactApolloHooks.useMutation<LoginMutation, LoginVariables>(
        LoginDocument,
        baseOptions
    )
}
export const RegisterDocument = gql`
    mutation Register($Username: String!, $Password: String!, $Email: String!) {
        User {
            Register(Username: $Username, Password: $Password, Email: $Email)
        }
    }
`
export function useRegister(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        RegisterMutation,
        RegisterVariables
    >
) {
    return ReactApolloHooks.useMutation<RegisterMutation, RegisterVariables>(
        RegisterDocument,
        baseOptions
    )
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
        Submission {
            CreateSelf(Items: $Items, ZipCode: $ZipCode) {
                Items {
                    Count
                }
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
export const RemoveSubmissionDocument = gql`
    mutation RemoveSubmission($Id: ID!) {
        Submission {
            Remove(Id: $Id) {
                Id
            }
        }
    }
`
export function useRemoveSubmission(
    baseOptions?: ReactApolloHooks.MutationHookOptions<
        RemoveSubmissionMutation,
        RemoveSubmissionVariables
    >
) {
    return ReactApolloHooks.useMutation<
        RemoveSubmissionMutation,
        RemoveSubmissionVariables
    >(RemoveSubmissionDocument, baseOptions)
}
export const MyUsernameDocument = gql`
    query MyUsername {
        User {
            Me {
                UserName
            }
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
        User {
            Me {
                ZipCode
            }
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
export const MyUserTypeDocument = gql`
    query MyUserType {
        User {
            Me {
                Type
            }
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
export const ItemsDocument = gql`
    query Items {
        Item {
            All {
                Id
                Name
                SelectedCount @client
            }
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
        Submission {
            AllMine {
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

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
    Item: ItemQuery

    Submission: SubmissionQuery

    User: UserQuery
}

export interface ItemQuery {
    /** List of items available to submit */
    All: ItemType[]

    Single?: Maybe<ItemType>
}

export interface ItemType {
    Id: string

    Name: string

    SelectedCount: number
}

export interface SubmissionQuery {
    All: Submission[]

    AllMine: Submission[]

    Get?: Maybe<Submission>

    GetMine?: Maybe<Submission>
}

export interface Submission {
    Id: string

    Items: ItemSubmissionBatch[]

    Submitted: DateTimeOffset

    Visitor: User

    ZipCode?: Maybe<string>
}

export interface ItemSubmissionBatch {
    Count: number

    Id: string

    Item: ItemType
}

export interface User {
    NormalizedEmail: string

    Submissions: Submission[]

    Type: UserType

    UserName: string

    ZipCode?: Maybe<string>
}

export interface UserQuery {
    Me?: Maybe<User>
}

export interface Mutation {
    Item: ItemMutation

    Submission: SubmissionMutation

    User: UserMutation

    ResetItemSelectedCounts: boolean

    UpdateItemSelectedCount: number
}

export interface ItemMutation {
    Create?: Maybe<ItemType>
}

export interface SubmissionMutation {
    CreateSelf?: Maybe<Submission>

    Modify?: Maybe<Submission>

    Remove?: Maybe<Submission>
}

export interface UserMutation {
    Login?: Maybe<string>

    Register?: Maybe<string>
}

// ====================================================
// Arguments
// ====================================================

export interface SingleItemQueryArgs {
    Id: string
}
export interface GetSubmissionQueryArgs {
    Id: string
}
export interface GetMineSubmissionQueryArgs {
    Id: string
}
export interface UpdateItemSelectedCountMutationArgs {
    Id: string

    SelectedCount: number
}
export interface CreateItemMutationArgs {
    Name: string
}
export interface CreateSelfSubmissionMutationArgs {
    Items: string[]

    ZipCode: string
}
export interface ModifySubmissionMutationArgs {
    Id: string

    Items: string[]

    Time: DateTimeOffset
}
export interface RemoveSubmissionMutationArgs {
    Id: string
}
export interface LoginUserMutationArgs {
    Password: string

    Username: string
}
export interface RegisterUserMutationArgs {
    Email: string

    Password: string

    Username: string
}

import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig
} from "graphql"

import {GraphQLContext} from "./context"

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
    Item?: QueryItemResolver<ItemQuery, TypeParent, TContext>

    Submission?: QuerySubmissionResolver<SubmissionQuery, TypeParent, TContext>

    User?: QueryUserResolver<UserQuery, TypeParent, TContext>
}

export type QueryItemResolver<
    R = ItemQuery,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type QuerySubmissionResolver<
    R = SubmissionQuery,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type QueryUserResolver<
    R = UserQuery,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface ItemQueryResolvers<
    TContext = GraphQLContext,
    TypeParent = ItemQuery
> {
    /** List of items available to submit */
    All?: ItemQueryAllResolver<ItemType[], TypeParent, TContext>

    Single?: ItemQuerySingleResolver<Maybe<ItemType>, TypeParent, TContext>
}

export type ItemQueryAllResolver<
    R = ItemType[],
    Parent = ItemQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type ItemQuerySingleResolver<
    R = Maybe<ItemType>,
    Parent = ItemQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, ItemQuerySingleArgs>
export interface ItemQuerySingleArgs {
    Id: string
}

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

export interface SubmissionQueryResolvers<
    TContext = GraphQLContext,
    TypeParent = SubmissionQuery
> {
    All?: SubmissionQueryAllResolver<Submission[], TypeParent, TContext>

    AllMine?: SubmissionQueryAllMineResolver<Submission[], TypeParent, TContext>

    Get?: SubmissionQueryGetResolver<Maybe<Submission>, TypeParent, TContext>

    GetMine?: SubmissionQueryGetMineResolver<
        Maybe<Submission>,
        TypeParent,
        TContext
    >
}

export type SubmissionQueryAllResolver<
    R = Submission[],
    Parent = SubmissionQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type SubmissionQueryAllMineResolver<
    R = Submission[],
    Parent = SubmissionQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type SubmissionQueryGetResolver<
    R = Maybe<Submission>,
    Parent = SubmissionQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, SubmissionQueryGetArgs>
export interface SubmissionQueryGetArgs {
    Id: string
}

export type SubmissionQueryGetMineResolver<
    R = Maybe<Submission>,
    Parent = SubmissionQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, SubmissionQueryGetMineArgs>
export interface SubmissionQueryGetMineArgs {
    Id: string
}

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

    Visitor?: SubmissionVisitorResolver<User, TypeParent, TContext>

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
export type SubmissionVisitorResolver<
    R = User,
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

export interface UserQueryResolvers<
    TContext = GraphQLContext,
    TypeParent = UserQuery
> {
    Me?: UserQueryMeResolver<Maybe<User>, TypeParent, TContext>
}

export type UserQueryMeResolver<
    R = Maybe<User>,
    Parent = UserQuery,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>

export interface MutationResolvers<TContext = GraphQLContext, TypeParent = {}> {
    Item?: MutationItemResolver<ItemMutation, TypeParent, TContext>

    Submission?: MutationSubmissionResolver<
        SubmissionMutation,
        TypeParent,
        TContext
    >

    User?: MutationUserResolver<UserMutation, TypeParent, TContext>

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

export type MutationItemResolver<
    R = ItemMutation,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type MutationSubmissionResolver<
    R = SubmissionMutation,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
export type MutationUserResolver<
    R = UserMutation,
    Parent = {},
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext>
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

export interface ItemMutationResolvers<
    TContext = GraphQLContext,
    TypeParent = ItemMutation
> {
    Create?: ItemMutationCreateResolver<Maybe<ItemType>, TypeParent, TContext>
}

export type ItemMutationCreateResolver<
    R = Maybe<ItemType>,
    Parent = ItemMutation,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, ItemMutationCreateArgs>
export interface ItemMutationCreateArgs {
    Name: string
}

export interface SubmissionMutationResolvers<
    TContext = GraphQLContext,
    TypeParent = SubmissionMutation
> {
    CreateSelf?: SubmissionMutationCreateSelfResolver<
        Maybe<Submission>,
        TypeParent,
        TContext
    >

    Modify?: SubmissionMutationModifyResolver<
        Maybe<Submission>,
        TypeParent,
        TContext
    >

    Remove?: SubmissionMutationRemoveResolver<
        Maybe<Submission>,
        TypeParent,
        TContext
    >
}

export type SubmissionMutationCreateSelfResolver<
    R = Maybe<Submission>,
    Parent = SubmissionMutation,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, SubmissionMutationCreateSelfArgs>
export interface SubmissionMutationCreateSelfArgs {
    Items: string[]

    ZipCode: string
}

export type SubmissionMutationModifyResolver<
    R = Maybe<Submission>,
    Parent = SubmissionMutation,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, SubmissionMutationModifyArgs>
export interface SubmissionMutationModifyArgs {
    Id: string

    Items: string[]

    Time: DateTimeOffset
}

export type SubmissionMutationRemoveResolver<
    R = Maybe<Submission>,
    Parent = SubmissionMutation,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, SubmissionMutationRemoveArgs>
export interface SubmissionMutationRemoveArgs {
    Id: string
}

export interface UserMutationResolvers<
    TContext = GraphQLContext,
    TypeParent = UserMutation
> {
    Login?: UserMutationLoginResolver<Maybe<string>, TypeParent, TContext>

    Register?: UserMutationRegisterResolver<Maybe<string>, TypeParent, TContext>
}

export type UserMutationLoginResolver<
    R = Maybe<string>,
    Parent = UserMutation,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, UserMutationLoginArgs>
export interface UserMutationLoginArgs {
    Password: string

    Username: string
}

export type UserMutationRegisterResolver<
    R = Maybe<string>,
    Parent = UserMutation,
    TContext = GraphQLContext
> = Resolver<R, Parent, TContext, UserMutationRegisterArgs>
export interface UserMutationRegisterArgs {
    Email: string

    Password: string

    Username: string
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
    ItemQuery?: ItemQueryResolvers<TContext>
    ItemType?: ItemTypeResolvers<TContext>
    SubmissionQuery?: SubmissionQueryResolvers<TContext>
    Submission?: SubmissionResolvers<TContext>
    ItemSubmissionBatch?: ItemSubmissionBatchResolvers<TContext>
    User?: UserResolvers<TContext>
    UserQuery?: UserQueryResolvers<TContext>
    Mutation?: MutationResolvers<TContext>
    ItemMutation?: ItemMutationResolvers<TContext>
    SubmissionMutation?: SubmissionMutationResolvers<TContext>
    UserMutation?: UserMutationResolvers<TContext>
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
