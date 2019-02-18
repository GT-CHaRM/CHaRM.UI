import {ApolloCache} from "apollo-cache"
import gql from "graphql-tag"

export const defaults = {
    currentTab: 0
}

export const resolvers = {
    ItemType: {
        SelectedCount: ({Id}, _, {cache}: {cache: ApolloCache<any>}) => {
            const count =
                cache.readFragment({
                    id: Id,
                    fragment: gql`
                        fragment SelectedCount on ItemType {
                            SelectedCount @client
                        }
                    `
                }) || 0

            return count
        }
    },
    Mutation: {
        ResetItemSelectedCounts: (
            _,
            __,
            {cache}: {cache: ApolloCache<any>}
        ) => {
            const {items} = cache.readQuery({
                query: gql`
                    query GetAllItems {
                        items {
                            id
                        }
                    }
                `
            })
            for (const {id} of items) {
                cache.writeFragment({
                    id,
                    fragment: gql`
                        fragment SelectedCount on ItemType {
                            SelectedCount @client
                        }
                    `,
                    data: {
                        __typename: "ItemType",
                        SelectedCount: 0
                    }
                })
            }
            return true
        },

        UpdateItemSelectedCount: (
            _,
            {Id, SelectedCount},
            {cache}: {cache: ApolloCache<any>}
        ) => {
            cache.writeFragment({
                id: Id,
                fragment: gql`
                    fragment SelectedCount on ItemType {
                        SelectedCount @client
                    }
                `,
                data: {
                    __typename: "ItemType",
                    SelectedCount
                }
            })

            return SelectedCount
        }
    }
}
