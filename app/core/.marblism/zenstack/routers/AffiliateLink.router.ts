/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.AffiliateLinkInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.createMany(input as any))),

        create: procedure.input($Schema.AffiliateLinkInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.create(input as any))),

        deleteMany: procedure.input($Schema.AffiliateLinkInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.deleteMany(input as any))),

        delete: procedure.input($Schema.AffiliateLinkInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.delete(input as any))),

        findFirst: procedure.input($Schema.AffiliateLinkInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.findFirst(input as any))),

        findMany: procedure.input($Schema.AffiliateLinkInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.findMany(input as any))),

        findUnique: procedure.input($Schema.AffiliateLinkInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.findUnique(input as any))),

        updateMany: procedure.input($Schema.AffiliateLinkInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.updateMany(input as any))),

        update: procedure.input($Schema.AffiliateLinkInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.update(input as any))),

        count: procedure.input($Schema.AffiliateLinkInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AffiliateLinkCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AffiliateLinkCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AffiliateLinkCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AffiliateLinkCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AffiliateLinkCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AffiliateLinkCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AffiliateLinkGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AffiliateLinkGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AffiliateLinkCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AffiliateLinkCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AffiliateLinkGetPayload<T>, Context>) => Promise<Prisma.AffiliateLinkGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AffiliateLinkDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AffiliateLinkDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AffiliateLinkDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AffiliateLinkDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AffiliateLinkDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AffiliateLinkDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AffiliateLinkGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AffiliateLinkGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AffiliateLinkDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AffiliateLinkDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AffiliateLinkGetPayload<T>, Context>) => Promise<Prisma.AffiliateLinkGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AffiliateLinkFindFirstArgs, TData = Prisma.AffiliateLinkGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.AffiliateLinkFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AffiliateLinkGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AffiliateLinkFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AffiliateLinkFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AffiliateLinkGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AffiliateLinkGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AffiliateLinkFindManyArgs, TData = Array<Prisma.AffiliateLinkGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.AffiliateLinkFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AffiliateLinkGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AffiliateLinkFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AffiliateLinkFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AffiliateLinkGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AffiliateLinkGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AffiliateLinkFindUniqueArgs, TData = Prisma.AffiliateLinkGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AffiliateLinkFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AffiliateLinkGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AffiliateLinkFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AffiliateLinkFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AffiliateLinkGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AffiliateLinkGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AffiliateLinkUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AffiliateLinkUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AffiliateLinkUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AffiliateLinkUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AffiliateLinkUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AffiliateLinkUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AffiliateLinkGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AffiliateLinkGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AffiliateLinkUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AffiliateLinkUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AffiliateLinkGetPayload<T>, Context>) => Promise<Prisma.AffiliateLinkGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.AffiliateLinkCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AffiliateLinkCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.AffiliateLinkCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.AffiliateLinkCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.AffiliateLinkCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.AffiliateLinkCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.AffiliateLinkCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AffiliateLinkCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
