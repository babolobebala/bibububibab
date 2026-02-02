import { handleBpsCallback } from '../../utils/bps-callback'

export default defineEventHandler(async (event) => handleBpsCallback(event))
