import { usersRepository } from "./repository";

export const usersService = {
    getAll: async () => {
        const res = await usersRepository.getAll();
        return res.rows;
    },

    block: async (ids: number[]) => {
        return usersRepository.block(ids);
    },

    unblock: async (ids: number[]) => {
        return usersRepository.unblock(ids);
    },

    delete: async (ids: number[]) => {
        return usersRepository.delete(ids);
    },

    deleteUnverified: async () => {
        return usersRepository.deleteUnverified();
    }
};