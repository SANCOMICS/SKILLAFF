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

        createMany: procedure.input($Schema.WalletInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.createMany(input as any))),

        create: procedure.input($Schema.WalletInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.create(input as any))),

        deleteMany: procedure.input($Schema.WalletInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.deleteMany(input as any))),

        delete: procedure.input($Schema.WalletInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.delete(input as any))),

        findFirst: procedure.input($Schema.WalletInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).wallet.findFirst(input as any))),

        findMany: procedure.input($Schema.WalletInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).wallet.findMany(input as any))),

        findUnique: procedure.input($Schema.WalletInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).wallet.findUnique(input as any))),

        updateMany: procedure.input($Schema.WalletInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.updateMany(input as any))),

        update: procedure.input($Schema.WalletInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.update(input as any))),

        count: procedure.input($Schema.WalletInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).wallet.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.WalletCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.WalletCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WalletGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WalletGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WalletGetPayload<T>, Context>) => Promise<Prisma.WalletGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.WalletDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.WalletDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WalletGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WalletGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WalletGetPayload<T>, Context>) => Promise<Prisma.WalletGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.WalletFindFirstArgs, TData = Prisma.WalletGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.WalletFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WalletGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WalletFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.WalletFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WalletGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WalletGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.WalletFindManyArgs, TData = Array<Prisma.WalletGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.WalletFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.WalletGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WalletFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.WalletFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.WalletGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.WalletGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.WalletFindUniqueArgs, TData = Prisma.WalletGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WalletFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WalletGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WalletFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WalletFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WalletGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WalletGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.WalletUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.WalletUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WalletGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WalletGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WalletGetPayload<T>, Context>) => Promise<Prisma.WalletGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.WalletCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.WalletCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.WalletCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.WalletCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.WalletCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.WalletCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.WalletCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.WalletCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
