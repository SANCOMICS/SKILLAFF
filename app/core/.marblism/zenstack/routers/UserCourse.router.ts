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

        createMany: procedure.input($Schema.UserCourseInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.createMany(input as any))),

        create: procedure.input($Schema.UserCourseInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.create(input as any))),

        deleteMany: procedure.input($Schema.UserCourseInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.deleteMany(input as any))),

        delete: procedure.input($Schema.UserCourseInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.delete(input as any))),

        findFirst: procedure.input($Schema.UserCourseInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCourse.findFirst(input as any))),

        findMany: procedure.input($Schema.UserCourseInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCourse.findMany(input as any))),

        findUnique: procedure.input($Schema.UserCourseInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).userCourse.findUnique(input as any))),

        updateMany: procedure.input($Schema.UserCourseInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.updateMany(input as any))),

        update: procedure.input($Schema.UserCourseInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.update(input as any))),

        count: procedure.input($Schema.UserCourseInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCourse.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.UserCourseCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCourseCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCourseCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCourseCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.UserCourseCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCourseCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserCourseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserCourseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCourseCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCourseCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserCourseGetPayload<T>, Context>) => Promise<Prisma.UserCourseGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.UserCourseDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCourseDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCourseDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCourseDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.UserCourseDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCourseDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserCourseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserCourseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCourseDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCourseDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserCourseGetPayload<T>, Context>) => Promise<Prisma.UserCourseGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.UserCourseFindFirstArgs, TData = Prisma.UserCourseGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.UserCourseFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UserCourseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserCourseFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserCourseFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UserCourseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserCourseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.UserCourseFindManyArgs, TData = Array<Prisma.UserCourseGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.UserCourseFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.UserCourseGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserCourseFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserCourseFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.UserCourseGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.UserCourseGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.UserCourseFindUniqueArgs, TData = Prisma.UserCourseGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.UserCourseFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UserCourseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserCourseFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UserCourseFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UserCourseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserCourseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.UserCourseUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCourseUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCourseUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCourseUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.UserCourseUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCourseUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserCourseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserCourseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCourseUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCourseUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserCourseGetPayload<T>, Context>) => Promise<Prisma.UserCourseGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.UserCourseCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.UserCourseCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.UserCourseCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.UserCourseCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.UserCourseCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.UserCourseCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserCourseCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.UserCourseCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
