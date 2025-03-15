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

        createMany: procedure.input($Schema.TransactionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.createMany(input as any))),

        create: procedure.input($Schema.TransactionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.create(input as any))),

        deleteMany: procedure.input($Schema.TransactionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.deleteMany(input as any))),

        delete: procedure.input($Schema.TransactionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.delete(input as any))),

        findFirst: procedure.input($Schema.TransactionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).transaction.findFirst(input as any))),

        findMany: procedure.input($Schema.TransactionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).transaction.findMany(input as any))),

        findUnique: procedure.input($Schema.TransactionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).transaction.findUnique(input as any))),

        updateMany: procedure.input($Schema.TransactionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.updateMany(input as any))),

        update: procedure.input($Schema.TransactionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.update(input as any))),

        count: procedure.input($Schema.TransactionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).transaction.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TransactionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TransactionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionGetPayload<T>, Context>) => Promise<Prisma.TransactionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TransactionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TransactionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionGetPayload<T>, Context>) => Promise<Prisma.TransactionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TransactionFindFirstArgs, TData = Prisma.TransactionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TransactionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TransactionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TransactionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TransactionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TransactionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TransactionFindManyArgs, TData = Array<Prisma.TransactionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TransactionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TransactionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TransactionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TransactionFindUniqueArgs, TData = Prisma.TransactionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TransactionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TransactionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TransactionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TransactionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TransactionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TransactionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TransactionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionGetPayload<T>, Context>) => Promise<Prisma.TransactionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TransactionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TransactionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TransactionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TransactionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TransactionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TransactionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TransactionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TransactionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
