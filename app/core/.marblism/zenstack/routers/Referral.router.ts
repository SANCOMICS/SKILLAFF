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

        createMany: procedure.input($Schema.ReferralInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.createMany(input as any))),

        create: procedure.input($Schema.ReferralInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.create(input as any))),

        deleteMany: procedure.input($Schema.ReferralInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.deleteMany(input as any))),

        delete: procedure.input($Schema.ReferralInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.delete(input as any))),

        findFirst: procedure.input($Schema.ReferralInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).referral.findFirst(input as any))),

        findMany: procedure.input($Schema.ReferralInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).referral.findMany(input as any))),

        findUnique: procedure.input($Schema.ReferralInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).referral.findUnique(input as any))),

        updateMany: procedure.input($Schema.ReferralInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.updateMany(input as any))),

        update: procedure.input($Schema.ReferralInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.update(input as any))),

        count: procedure.input($Schema.ReferralInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).referral.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ReferralCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReferralCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReferralCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReferralCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ReferralCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReferralCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReferralGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReferralGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReferralCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReferralCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReferralGetPayload<T>, Context>) => Promise<Prisma.ReferralGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ReferralDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReferralDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReferralDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReferralDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ReferralDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReferralDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReferralGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReferralGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReferralDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReferralDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReferralGetPayload<T>, Context>) => Promise<Prisma.ReferralGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ReferralFindFirstArgs, TData = Prisma.ReferralGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ReferralFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ReferralGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReferralFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ReferralFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ReferralGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ReferralGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ReferralFindManyArgs, TData = Array<Prisma.ReferralGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ReferralFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ReferralGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReferralFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ReferralFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ReferralGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ReferralGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ReferralFindUniqueArgs, TData = Prisma.ReferralGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ReferralFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ReferralGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReferralFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReferralFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ReferralGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ReferralGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ReferralUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReferralUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReferralUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReferralUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ReferralUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReferralUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReferralGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReferralGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReferralUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReferralUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReferralGetPayload<T>, Context>) => Promise<Prisma.ReferralGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ReferralCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ReferralCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ReferralCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ReferralCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ReferralCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ReferralCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ReferralCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ReferralCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
