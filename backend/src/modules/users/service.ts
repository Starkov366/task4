import { usersRepository } from "./repository";

export const usersService = {
  
    getAll: async () => {
        const res = await usersRepository.getAll();
        return res.rows;
    },

  
    block: async (ids: number[]) => {
        if (!ids || !ids.length) {
            throw new Error("No user ids provided");
        }

        const result = await usersRepository.block(ids);

        return {
            affected: result.rowCount
        };
    },

    unblock: async (ids: number[]) => {
        if (!ids || !ids.length) {
            throw new Error("No user ids provided");
        }

        const result = await usersRepository.unblock(ids);

        return {
            affected: result.rowCount
        };
    },


    delete: async (ids: number[]) => {
        if (!ids || !ids.length) {
            throw new Error("No user ids provided");
        }

        const result = await usersRepository.delete(ids);

        return {
            affected: result.rowCount
        };
    },

    
    deleteUnverified: async () => {
        return usersRepository.deleteUnverified();
    }
};