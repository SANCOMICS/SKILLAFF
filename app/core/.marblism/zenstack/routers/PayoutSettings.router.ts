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

        createMany: procedure.input($Schema.PayoutSettingsInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.createMany(input as any))),

        create: procedure.input($Schema.PayoutSettingsInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.create(input as any))),

        deleteMany: procedure.input($Schema.PayoutSettingsInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.deleteMany(input as any))),

        delete: procedure.input($Schema.PayoutSettingsInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.delete(input as any))),

        findFirst: procedure.input($Schema.PayoutSettingsInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.findFirst(input as any))),

        findMany: procedure.input($Schema.PayoutSettingsInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.findMany(input as any))),

        findUnique: procedure.input($Schema.PayoutSettingsInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.findUnique(input as any))),

        updateMany: procedure.input($Schema.PayoutSettingsInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.updateMany(input as any))),

        update: procedure.input($Schema.PayoutSettingsInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.update(input as any))),

        count: procedure.input($Schema.PayoutSettingsInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PayoutSettingsCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PayoutSettingsCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PayoutSettingsCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PayoutSettingsCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PayoutSettingsCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PayoutSettingsCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PayoutSettingsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PayoutSettingsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PayoutSettingsCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PayoutSettingsCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PayoutSettingsGetPayload<T>, Context>) => Promise<Prisma.PayoutSettingsGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PayoutSettingsDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PayoutSettingsDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PayoutSettingsDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PayoutSettingsDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PayoutSettingsDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PayoutSettingsDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PayoutSettingsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PayoutSettingsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PayoutSettingsDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PayoutSettingsDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PayoutSettingsGetPayload<T>, Context>) => Promise<Prisma.PayoutSettingsGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PayoutSettingsFindFirstArgs, TData = Prisma.PayoutSettingsGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PayoutSettingsFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PayoutSettingsGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PayoutSettingsFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PayoutSettingsFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PayoutSettingsGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PayoutSettingsGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PayoutSettingsFindManyArgs, TData = Array<Prisma.PayoutSettingsGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PayoutSettingsFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PayoutSettingsGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PayoutSettingsFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PayoutSettingsFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PayoutSettingsGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PayoutSettingsGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PayoutSettingsFindUniqueArgs, TData = Prisma.PayoutSettingsGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PayoutSettingsFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PayoutSettingsGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PayoutSettingsFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PayoutSettingsFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PayoutSettingsGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PayoutSettingsGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PayoutSettingsUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PayoutSettingsUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PayoutSettingsUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PayoutSettingsUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PayoutSettingsUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PayoutSettingsUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PayoutSettingsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PayoutSettingsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PayoutSettingsUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PayoutSettingsUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PayoutSettingsGetPayload<T>, Context>) => Promise<Prisma.PayoutSettingsGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PayoutSettingsCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PayoutSettingsCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PayoutSettingsCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PayoutSettingsCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PayoutSettingsCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PayoutSettingsCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PayoutSettingsCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PayoutSettingsCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
