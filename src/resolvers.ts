import gql from "graphql-tag"
import {IResolvers} from "./graphql"

export const defaults = {}

export const resolvers: IResolvers = {
    ItemType: {
        SelectedCount: ({Id}, _, {cache}) => {
            const count =
                cache.readFragment<number>({
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
        ResetItemSelectedCounts: (_, __, {cache}) => {
            const {
                Item: {All: items}
            } = cache.readQuery({
                query: gql`
                    query GetAllItems {
                        Item {
                            All {
                                Id
                            }
                        }
                    }
                `
            })
            for (const {Id} of items) {
                cache.writeFragment({
                    id: Id,
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

        UpdateItemSelectedCount: (_, {Id, SelectedCount}, {cache}) => {
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
