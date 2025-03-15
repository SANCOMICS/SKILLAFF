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

        createMany: procedure.input($Schema.SkillFeedVideoInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.createMany(input as any))),

        create: procedure.input($Schema.SkillFeedVideoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.create(input as any))),

        deleteMany: procedure.input($Schema.SkillFeedVideoInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.deleteMany(input as any))),

        delete: procedure.input($Schema.SkillFeedVideoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.delete(input as any))),

        findFirst: procedure.input($Schema.SkillFeedVideoInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.findFirst(input as any))),

        findMany: procedure.input($Schema.SkillFeedVideoInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.findMany(input as any))),

        findUnique: procedure.input($Schema.SkillFeedVideoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.findUnique(input as any))),

        updateMany: procedure.input($Schema.SkillFeedVideoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.updateMany(input as any))),

        update: procedure.input($Schema.SkillFeedVideoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.update(input as any))),

        count: procedure.input($Schema.SkillFeedVideoInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SkillFeedVideoCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SkillFeedVideoCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SkillFeedVideoCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SkillFeedVideoCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SkillFeedVideoCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SkillFeedVideoCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SkillFeedVideoGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SkillFeedVideoGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SkillFeedVideoCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SkillFeedVideoCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SkillFeedVideoGetPayload<T>, Context>) => Promise<Prisma.SkillFeedVideoGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SkillFeedVideoDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SkillFeedVideoDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SkillFeedVideoDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SkillFeedVideoDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SkillFeedVideoDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SkillFeedVideoDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SkillFeedVideoGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SkillFeedVideoGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SkillFeedVideoDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SkillFeedVideoDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SkillFeedVideoGetPayload<T>, Context>) => Promise<Prisma.SkillFeedVideoGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SkillFeedVideoFindFirstArgs, TData = Prisma.SkillFeedVideoGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.SkillFeedVideoFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SkillFeedVideoGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SkillFeedVideoFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SkillFeedVideoFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SkillFeedVideoGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SkillFeedVideoGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SkillFeedVideoFindManyArgs, TData = Array<Prisma.SkillFeedVideoGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.SkillFeedVideoFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SkillFeedVideoGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SkillFeedVideoFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SkillFeedVideoFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SkillFeedVideoGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SkillFeedVideoGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SkillFeedVideoFindUniqueArgs, TData = Prisma.SkillFeedVideoGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SkillFeedVideoFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SkillFeedVideoGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SkillFeedVideoFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SkillFeedVideoFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SkillFeedVideoGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SkillFeedVideoGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SkillFeedVideoUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SkillFeedVideoUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SkillFeedVideoUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SkillFeedVideoUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SkillFeedVideoUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SkillFeedVideoUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SkillFeedVideoGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SkillFeedVideoGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SkillFeedVideoUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SkillFeedVideoUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SkillFeedVideoGetPayload<T>, Context>) => Promise<Prisma.SkillFeedVideoGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.SkillFeedVideoCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SkillFeedVideoCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.SkillFeedVideoCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SkillFeedVideoCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.SkillFeedVideoCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.SkillFeedVideoCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SkillFeedVideoCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SkillFeedVideoCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
