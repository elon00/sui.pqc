// Copyright (c) 2026 Quantum Sui Foundation
// SPDX-License-Identifier: Apache-2.0

/// Quantum Sui Conway AI Cellular Automaton Engine & Entropy Beacon
module quantum_sui::conway_automaton {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;

    public struct ConwayEngine has key {
        id: UID,
        generation: u64,
        active_cells_count: u64,
        entropy_hash: vector<u8>,
        quantum_entangled: bool,
    }

    public struct GenerationAdvancedEvent has copy, drop {
        generation: u64,
        active_cells_count: u64,
        entropy_hash: vector<u8>,
    }

    fun init(ctx: &mut TxContext) {
        let engine = ConwayEngine {
            id: object::new(ctx),
            generation: 0,
            active_cells_count: 32,
            entropy_hash: b"0xqsui_quantum_genesis_beacon_entropy_seed",
            quantum_entangled: true,
        };
        transfer::share_object(engine);
    }

    public entry fun advance_generation(
        engine: &mut ConwayEngine,
        new_active_cells: u64,
        new_entropy_hash: vector<u8>,
        _ctx: &mut TxContext
    ) {
        engine.generation = engine.generation + 1;
        engine.active_cells_count = new_active_cells;
        engine.entropy_hash = new_entropy_hash;

        event::emit(GenerationAdvancedEvent {
            generation: engine.generation,
            active_cells_count: new_active_cells,
            entropy_hash: new_entropy_hash,
        });
    }
}
