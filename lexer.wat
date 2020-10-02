(module
  (type (;0;) (func (param i32 i32)))
  (type (;1;) (func (param i32 i32 i32 i32)))
  (type (;2;) (func (param i32 i32 i32)))
  (type (;3;) (func (param i32)))
  (type (;4;) (func))
  (type (;5;) (func (param i32) (result i32)))
  (import "env" "syntaxError" (func $syntaxError (type 0)))
  (import "env" "emitImportName" (func $emitImportName (type 1)))
  (import "env" "finalizeImport" (func $finalizeImport (type 2)))
  (import "env" "emitDynamicImport" (func $emitDynamicImport (type 1)))
  (import "env" "emitImportMeta" (func $emitImportMeta (type 0)))
  (import "env" "openImport" (func $openImport (type 3)))
  (import "env" "emitExportName" (func $emitExportName (type 1)))
  (import "env" "finalizeDelegatedExport" (func $finalizeDelegatedExport (type 2)))
  (import "env" "openExport" (func $openExport (type 3)))
  (import "env" "finalizeExport" (func $finalizeExport (type 3)))
  (func $__wasm_call_ctors (type 4))
  (func $consumeWhitespaceAndComments (type 3) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    block  ;; label = @1
      local.get 0
      i32.load offset=4
      local.tee 1
      local.get 0
      i32.load offset=16
      local.tee 2
      i32.le_s
      br_if 0 (;@1;)
      local.get 0
      i32.const 16
      i32.add
      local.set 3
      loop  ;; label = @2
        local.get 2
        i32.const 2
        i32.add
        local.set 4
        local.get 0
        i32.load align=1
        local.get 2
        i32.const 1
        i32.shl
        i32.add
        local.tee 5
        i32.load16_u
        local.set 6
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                local.get 1
                local.get 2
                i32.sub
                i32.const 2
                i32.eq
                br_if 0 (;@6;)
                local.get 1
                local.get 4
                i32.lt_s
                br_if 1 (;@5;)
              end
              block  ;; label = @6
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      local.get 5
                      i32.const 1192
                      i32.eq
                      br_if 0 (;@9;)
                      block  ;; label = @10
                        local.get 6
                        i32.const 47
                        i32.ne
                        local.tee 7
                        br_if 0 (;@10;)
                        i32.const 2
                        local.set 8
                        i32.const 0
                        local.set 9
                        loop  ;; label = @11
                          local.get 9
                          i32.const 1
                          i32.add
                          local.tee 9
                          i32.const 1
                          i32.gt_u
                          br_if 2 (;@9;)
                          local.get 5
                          local.get 8
                          i32.add
                          local.set 10
                          local.get 8
                          i32.const 1192
                          i32.add
                          local.set 11
                          local.get 8
                          i32.const 2
                          i32.add
                          local.set 8
                          local.get 11
                          i32.load16_u
                          local.get 10
                          i32.load16_u
                          i32.eq
                          br_if 0 (;@11;)
                        end
                      end
                      local.get 5
                      i32.const 1198
                      i32.eq
                      br_if 2 (;@7;)
                      local.get 6
                      i32.const 31
                      i32.gt_s
                      br_if 1 (;@8;)
                      local.get 6
                      i32.const -9
                      i32.add
                      i32.const 5
                      i32.lt_u
                      br_if 5 (;@4;)
                      br 8 (;@1;)
                    end
                    local.get 5
                    i32.const 2
                    i32.add
                    local.set 8
                    loop  ;; label = @9
                      local.get 2
                      i32.const 1
                      i32.add
                      local.tee 4
                      local.get 1
                      i32.ge_s
                      br_if 5 (;@4;)
                      block  ;; label = @10
                        local.get 8
                        i32.load16_u
                        local.tee 9
                        i32.const 13
                        i32.eq
                        local.tee 10
                        br_if 0 (;@10;)
                        local.get 8
                        i32.const 2
                        i32.add
                        local.set 8
                        local.get 4
                        local.set 2
                        local.get 9
                        i32.const 10
                        i32.ne
                        br_if 1 (;@9;)
                      end
                    end
                    local.get 3
                    local.get 4
                    i32.store
                    block  ;; label = @9
                      local.get 9
                      i32.const 10
                      i32.eq
                      br_if 0 (;@9;)
                      local.get 10
                      i32.eqz
                      br_if 3 (;@6;)
                    end
                    local.get 4
                    i32.const 1
                    i32.add
                    local.set 2
                    br 5 (;@3;)
                  end
                  local.get 6
                  i32.const 32
                  i32.eq
                  br_if 3 (;@4;)
                  local.get 6
                  i32.const 160
                  i32.eq
                  br_if 3 (;@4;)
                  local.get 7
                  br_if 6 (;@1;)
                  i32.const 2
                  local.set 8
                  i32.const 0
                  local.set 9
                  loop  ;; label = @8
                    local.get 9
                    i32.const 1
                    i32.add
                    local.tee 9
                    i32.const 1
                    i32.gt_u
                    br_if 1 (;@7;)
                    local.get 5
                    local.get 8
                    i32.add
                    local.set 10
                    local.get 8
                    i32.const 1198
                    i32.add
                    local.set 11
                    local.get 8
                    i32.const 2
                    i32.add
                    local.set 8
                    local.get 11
                    i32.load16_u
                    local.get 10
                    i32.load16_u
                    i32.eq
                    br_if 0 (;@8;)
                    br 3 (;@5;)
                  end
                end
                local.get 3
                local.get 4
                i32.store
                block  ;; label = @7
                  local.get 1
                  local.get 4
                  i32.le_s
                  br_if 0 (;@7;)
                  i32.const 0
                  local.get 1
                  i32.sub
                  local.set 9
                  local.get 5
                  i32.const 4
                  i32.add
                  local.set 8
                  loop  ;; label = @8
                    local.get 4
                    i32.const 2
                    i32.add
                    local.set 2
                    block  ;; label = @9
                      block  ;; label = @10
                        local.get 9
                        local.get 4
                        i32.add
                        i32.const -2
                        i32.eq
                        br_if 0 (;@10;)
                        local.get 1
                        local.get 2
                        i32.lt_s
                        br_if 1 (;@9;)
                      end
                      i32.const 1268
                      local.get 8
                      i32.eq
                      br_if 6 (;@3;)
                      local.get 8
                      i32.load16_u
                      i32.const 42
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 8
                      i32.const 2
                      i32.add
                      i32.load16_u
                      i32.const 47
                      i32.eq
                      br_if 6 (;@3;)
                    end
                    local.get 3
                    local.get 4
                    i32.const 1
                    i32.add
                    local.tee 4
                    i32.store
                    local.get 8
                    i32.const 2
                    i32.add
                    local.set 8
                    local.get 1
                    local.get 4
                    i32.gt_s
                    br_if 0 (;@8;)
                  end
                end
                i32.const 1204
                i32.const 31
                call $syntaxError
                local.get 0
                i32.const 4
                i32.add
                i32.load
                local.tee 1
                local.get 3
                i32.load
                local.tee 2
                i32.gt_s
                br_if 4 (;@2;)
                br 5 (;@1;)
              end
              local.get 1
              local.get 4
              local.tee 2
              i32.gt_s
              br_if 3 (;@2;)
              br 4 (;@1;)
            end
            local.get 6
            i32.const -9
            i32.add
            i32.const 5
            i32.lt_u
            br_if 0 (;@4;)
            local.get 6
            i32.const 160
            i32.eq
            br_if 0 (;@4;)
            local.get 6
            i32.const 32
            i32.ne
            br_if 3 (;@1;)
          end
          local.get 2
          i32.const 1
          i32.add
          local.set 2
        end
        local.get 3
        local.get 2
        i32.store
        local.get 1
        local.get 2
        i32.gt_s
        br_if 0 (;@2;)
      end
    end)
  (func $consumeTemplateLiteralPart (type 5) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    local.get 0
    local.get 0
    i32.load offset=16
    local.tee 1
    i32.const 1
    i32.add
    local.tee 2
    i32.store offset=16
    local.get 0
    i32.load align=1
    local.tee 3
    local.get 1
    i32.const 1
    i32.shl
    i32.add
    i32.load16_u
    local.set 4
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        i32.load offset=4
        local.tee 5
        local.get 2
        i32.le_s
        br_if 0 (;@2;)
        local.get 0
        i32.const 16
        i32.add
        local.set 6
        loop  ;; label = @3
          local.get 1
          local.set 7
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  local.get 3
                  local.get 2
                  i32.const 1
                  i32.shl
                  i32.add
                  local.tee 8
                  i32.load16_u
                  local.tee 9
                  i32.const 96
                  i32.eq
                  br_if 0 (;@7;)
                  block  ;; label = @8
                    local.get 5
                    local.get 2
                    i32.sub
                    i32.const 2
                    i32.eq
                    br_if 0 (;@8;)
                    local.get 5
                    local.get 7
                    i32.const 3
                    i32.add
                    i32.lt_s
                    br_if 2 (;@6;)
                  end
                  local.get 8
                  i32.const 1274
                  i32.eq
                  br_if 6 (;@1;)
                  local.get 9
                  i32.const 92
                  i32.eq
                  br_if 2 (;@5;)
                  block  ;; label = @8
                    block  ;; label = @9
                      local.get 9
                      i32.const 36
                      i32.ne
                      br_if 0 (;@9;)
                      i32.const 2
                      local.set 1
                      i32.const 0
                      local.set 10
                      loop  ;; label = @10
                        local.get 10
                        i32.const 1
                        i32.add
                        local.tee 10
                        i32.const 1
                        i32.gt_u
                        br_if 2 (;@8;)
                        local.get 8
                        local.get 1
                        i32.add
                        local.set 11
                        local.get 1
                        i32.const 1274
                        i32.add
                        local.set 12
                        local.get 1
                        i32.const 2
                        i32.add
                        local.set 1
                        local.get 12
                        i32.load16_u
                        local.get 11
                        i32.load16_u
                        i32.eq
                        br_if 0 (;@10;)
                        br 4 (;@6;)
                      end
                    end
                    local.get 2
                    local.set 1
                    br 4 (;@4;)
                  end
                  i32.const 36
                  local.set 9
                  br 6 (;@1;)
                end
                i32.const 96
                local.set 9
                br 5 (;@1;)
              end
              local.get 2
              local.set 1
              local.get 9
              i32.const 92
              i32.ne
              br_if 1 (;@4;)
            end
            local.get 6
            local.get 7
            i32.const 2
            i32.add
            local.tee 1
            i32.store
          end
          local.get 6
          local.get 1
          i32.const 1
          i32.add
          local.tee 2
          i32.store
          local.get 5
          local.get 2
          i32.gt_s
          br_if 0 (;@3;)
        end
      end
      i32.const 1280
      i32.const 36
      call $syntaxError
      local.get 0
      i32.load align=1
      local.get 0
      i32.const 16
      i32.add
      i32.load
      local.tee 2
      i32.const 1
      i32.shl
      i32.add
      i32.load16_u
      local.set 9
    end
    local.get 0
    i32.const 16
    i32.add
    local.get 2
    i32.const 1
    i32.const 2
    local.get 9
    i32.const 65535
    i32.and
    i32.const 96
    i32.eq
    local.tee 1
    select
    local.tee 10
    i32.add
    i32.store
    local.get 10
    i32.const 4
    i32.const 3
    local.get 1
    select
    local.get 4
    i32.const 65535
    i32.and
    i32.const 96
    i32.eq
    select)
  (func $tokenize (type 0) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i64)
    global.get 0
    i32.const 32
    i32.sub
    local.tee 2
    global.set 0
    local.get 0
    call $consumeWhitespaceAndComments
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        i32.load offset=16
        local.tee 3
        local.get 0
        i32.load offset=4
        local.tee 4
        i32.ge_s
        br_if 0 (;@2;)
        local.get 0
        i32.const 16
        i32.add
        local.set 5
        local.get 1
        i32.const 3
        i32.ne
        local.set 6
        local.get 0
        i32.const 8
        i32.add
        local.set 7
        local.get 0
        i32.const 12
        i32.add
        local.set 8
        loop  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              local.get 6
              br_if 0 (;@5;)
              local.get 0
              i32.load align=1
              local.tee 11
              local.get 3
              i32.const 1
              i32.shl
              i32.add
              local.tee 17
              i32.load16_u
              local.tee 10
              i32.const 41
              i32.ne
              br_if 1 (;@4;)
              br 4 (;@1;)
            end
            block  ;; label = @5
              block  ;; label = @6
                local.get 1
                i32.const 1
                i32.eq
                br_if 0 (;@6;)
                local.get 1
                i32.const 2
                i32.ne
                br_if 1 (;@5;)
                local.get 0
                i32.load align=1
                local.tee 11
                local.get 3
                i32.const 1
                i32.shl
                i32.add
                local.tee 17
                i32.load16_u
                local.tee 10
                i32.const 125
                i32.ne
                br_if 2 (;@4;)
                br 5 (;@1;)
              end
              local.get 0
              i32.load align=1
              local.tee 11
              local.get 3
              i32.const 1
              i32.shl
              i32.add
              local.tee 17
              i32.load16_u
              local.tee 10
              i32.const 96
              i32.eq
              br_if 4 (;@1;)
              local.get 10
              i32.const 125
              i32.ne
              br_if 1 (;@4;)
              br 4 (;@1;)
            end
            local.get 0
            i32.load align=1
            local.tee 11
            local.get 3
            i32.const 1
            i32.shl
            i32.add
            local.tee 17
            i32.load16_u
            local.set 10
          end
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        block  ;; label = @11
                          local.get 10
                          i32.const 65535
                          i32.and
                          local.tee 9
                          i32.const 96
                          i32.eq
                          br_if 0 (;@11;)
                          local.get 9
                          i32.const 47
                          i32.ne
                          br_if 1 (;@10;)
                          local.get 8
                          i32.load
                          local.tee 9
                          i32.eqz
                          br_if 6 (;@5;)
                          local.get 7
                          i32.load align=1
                          local.tee 15
                          i32.load16_u
                          local.tee 10
                          i32.const -33
                          i32.add
                          local.tee 14
                          i32.const 5
                          i32.gt_u
                          br_if 2 (;@9;)
                          i32.const 1
                          local.get 14
                          i32.shl
                          i32.const 49
                          i32.and
                          i32.eqz
                          br_if 2 (;@9;)
                          br 6 (;@5;)
                        end
                        local.get 0
                        call $consumeTemplateLiteralPart
                        local.set 10
                        local.get 7
                        local.get 0
                        i32.load
                        local.get 3
                        i32.const 1
                        i32.shl
                        i32.add
                        i32.store
                        local.get 8
                        local.get 5
                        i32.load
                        local.get 3
                        i32.sub
                        i32.store
                        local.get 10
                        i32.const 1
                        i32.eq
                        br_if 6 (;@4;)
                        loop  ;; label = @11
                          local.get 0
                          i32.const 1
                          call $tokenize
                          local.get 5
                          i32.load
                          local.set 10
                          local.get 0
                          call $consumeTemplateLiteralPart
                          local.set 14
                          local.get 7
                          local.get 0
                          i32.load
                          local.get 10
                          i32.const 1
                          i32.shl
                          i32.add
                          i32.store
                          local.get 8
                          local.get 5
                          i32.load
                          local.get 10
                          i32.sub
                          i32.store
                          local.get 14
                          i32.const 4
                          i32.ne
                          br_if 0 (;@11;)
                          br 7 (;@4;)
                        end
                      end
                      block  ;; label = @10
                        block  ;; label = @11
                          local.get 10
                          i32.const 255
                          i32.and
                          local.tee 14
                          i32.const 39
                          i32.eq
                          br_if 0 (;@11;)
                          local.get 14
                          i32.const 34
                          i32.ne
                          br_if 1 (;@10;)
                        end
                        local.get 5
                        local.get 3
                        i32.const 1
                        i32.add
                        local.tee 10
                        i32.store
                        local.get 3
                        local.set 13
                        block  ;; label = @11
                          block  ;; label = @12
                            local.get 10
                            local.get 4
                            i32.ge_s
                            br_if 0 (;@12;)
                            loop  ;; label = @13
                              local.get 11
                              local.get 10
                              i32.const 1
                              i32.shl
                              i32.add
                              i32.load16_u
                              local.tee 15
                              local.get 9
                              i32.eq
                              br_if 2 (;@11;)
                              local.get 10
                              local.set 14
                              block  ;; label = @14
                                local.get 15
                                i32.const 92
                                i32.ne
                                br_if 0 (;@14;)
                                local.get 5
                                local.get 13
                                i32.const 2
                                i32.add
                                local.tee 14
                                i32.store
                              end
                              local.get 5
                              local.get 14
                              i32.const 1
                              i32.add
                              local.tee 10
                              i32.store
                              local.get 14
                              local.set 13
                              local.get 10
                              local.get 4
                              i32.lt_s
                              br_if 0 (;@13;)
                            end
                          end
                          i32.const 1354
                          i32.const 27
                          call $syntaxError
                          local.get 0
                          i32.load
                          local.get 3
                          i32.const 1
                          i32.shl
                          i32.add
                          local.set 17
                          local.get 5
                          i32.load
                          local.set 10
                        end
                        local.get 7
                        local.get 17
                        i32.store
                        local.get 5
                        local.get 10
                        i32.const 1
                        i32.add
                        local.tee 10
                        i32.store
                        local.get 8
                        local.get 10
                        local.get 3
                        i32.sub
                        i32.store
                        br 6 (;@4;)
                      end
                      local.get 9
                      i32.const 39
                      i32.gt_s
                      br_if 1 (;@8;)
                      local.get 9
                      i32.const -37
                      i32.add
                      i32.const 2
                      i32.lt_u
                      br_if 3 (;@6;)
                      local.get 9
                      i32.const 33
                      i32.eq
                      br_if 3 (;@6;)
                      br 2 (;@7;)
                    end
                    local.get 10
                    i32.const -58
                    i32.add
                    i32.const 65535
                    i32.and
                    i32.const 6
                    i32.lt_u
                    br_if 3 (;@5;)
                    local.get 10
                    i32.const 41
                    i32.ne
                    local.get 10
                    i32.const -40
                    i32.add
                    i32.const 65535
                    i32.and
                    i32.const 7
                    i32.lt_u
                    i32.and
                    br_if 3 (;@5;)
                    local.get 10
                    i32.const 91
                    i32.eq
                    br_if 3 (;@5;)
                    local.get 10
                    i32.const 94
                    i32.eq
                    br_if 3 (;@5;)
                    block  ;; label = @9
                      local.get 10
                      i32.const 125
                      i32.eq
                      br_if 0 (;@9;)
                      local.get 10
                      i32.const -123
                      i32.add
                      i32.const 65535
                      i32.and
                      i32.const 4
                      i32.lt_u
                      br_if 4 (;@5;)
                    end
                    block  ;; label = @9
                      block  ;; label = @10
                        local.get 9
                        i32.const 5
                        i32.eq
                        br_if 0 (;@10;)
                        local.get 9
                        i32.const -2
                        i32.add
                        local.tee 14
                        i32.const 8
                        i32.gt_u
                        br_if 1 (;@9;)
                        block  ;; label = @11
                          block  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                block  ;; label = @15
                                  block  ;; label = @16
                                    block  ;; label = @17
                                      block  ;; label = @18
                                        block  ;; label = @19
                                          block  ;; label = @20
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  local.get 14
                                                  br_table 0 (;@23;) 1 (;@22;) 2 (;@21;) 14 (;@9;) 3 (;@20;) 14 (;@9;) 4 (;@19;) 14 (;@9;) 5 (;@18;) 0 (;@23;)
                                                end
                                                local.get 15
                                                i32.const 1078
                                                i32.eq
                                                br_if 17 (;@5;)
                                                local.get 10
                                                i32.const 100
                                                i32.ne
                                                br_if 9 (;@13;)
                                                local.get 15
                                                i32.load16_u offset=2
                                                i32.const 111
                                                i32.eq
                                                br_if 17 (;@5;)
                                                local.get 15
                                                i32.const 1094
                                                i32.ne
                                                br_if 13 (;@9;)
                                                br 17 (;@5;)
                                              end
                                              local.get 15
                                              i32.const 1122
                                              i32.eq
                                              br_if 16 (;@5;)
                                              local.get 10
                                              i32.const 110
                                              i32.ne
                                              br_if 12 (;@9;)
                                              local.get 15
                                              i32.load16_u offset=2
                                              i32.const 101
                                              i32.ne
                                              br_if 12 (;@9;)
                                              local.get 15
                                              i32.load16_u offset=4
                                              i32.const 119
                                              i32.ne
                                              br_if 12 (;@9;)
                                              br 16 (;@5;)
                                            end
                                            local.get 15
                                            i32.const 1036
                                            i32.eq
                                            br_if 15 (;@5;)
                                            local.get 10
                                            i32.const 99
                                            i32.ne
                                            br_if 4 (;@16;)
                                            local.get 15
                                            i32.load16_u offset=2
                                            i32.const 97
                                            i32.ne
                                            br_if 4 (;@16;)
                                            local.get 15
                                            i32.load16_u offset=4
                                            i32.const 115
                                            i32.ne
                                            br_if 4 (;@16;)
                                            local.get 15
                                            i32.load16_u offset=6
                                            i32.const 101
                                            i32.eq
                                            br_if 15 (;@5;)
                                            local.get 15
                                            i32.const 1084
                                            i32.eq
                                            br_if 15 (;@5;)
                                            local.get 15
                                            i32.const 1170
                                            i32.ne
                                            br_if 9 (;@11;)
                                            br 15 (;@5;)
                                          end
                                          local.get 15
                                          i32.const 1064
                                          i32.eq
                                          br_if 14 (;@5;)
                                          local.get 10
                                          i32.const 100
                                          i32.ne
                                          br_if 2 (;@17;)
                                          local.get 15
                                          i32.load16_u offset=2
                                          i32.const 101
                                          i32.ne
                                          br_if 2 (;@17;)
                                          local.get 15
                                          i32.load16_u offset=4
                                          i32.const 108
                                          i32.ne
                                          br_if 2 (;@17;)
                                          local.get 15
                                          i32.load16_u offset=6
                                          i32.const 101
                                          i32.ne
                                          br_if 2 (;@17;)
                                          local.get 15
                                          i32.load16_u offset=8
                                          i32.const 116
                                          i32.ne
                                          br_if 2 (;@17;)
                                          local.get 15
                                          i32.load16_u offset=10
                                          i32.const 101
                                          i32.eq
                                          br_if 14 (;@5;)
                                          local.get 15
                                          i32.const 1130
                                          i32.eq
                                          br_if 14 (;@5;)
                                          local.get 15
                                          i32.const 1156
                                          i32.ne
                                          br_if 5 (;@14;)
                                          br 14 (;@5;)
                                        end
                                        local.get 15
                                        i32.const 1046
                                        i32.eq
                                        br_if 13 (;@5;)
                                        local.get 10
                                        i32.const 100
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=2
                                        i32.const 101
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=4
                                        i32.const 98
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=6
                                        i32.const 117
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=8
                                        i32.const 103
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=10
                                        i32.const 103
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=12
                                        i32.const 101
                                        i32.ne
                                        br_if 9 (;@9;)
                                        local.get 15
                                        i32.load16_u offset=14
                                        i32.const 114
                                        i32.ne
                                        br_if 9 (;@9;)
                                        br 13 (;@5;)
                                      end
                                      local.get 15
                                      i32.const 1100
                                      i32.eq
                                      br_if 12 (;@5;)
                                      local.get 10
                                      i32.const 105
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=2
                                      i32.const 110
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=4
                                      i32.const 115
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=6
                                      i32.const 116
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=8
                                      i32.const 97
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=10
                                      i32.const 110
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=12
                                      i32.const 99
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=14
                                      i32.const 101
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=16
                                      i32.const 111
                                      i32.ne
                                      br_if 8 (;@9;)
                                      local.get 15
                                      i32.load16_u offset=18
                                      i32.const 102
                                      i32.ne
                                      br_if 8 (;@9;)
                                      br 12 (;@5;)
                                    end
                                    local.get 15
                                    i32.const 1130
                                    i32.eq
                                    br_if 11 (;@5;)
                                    local.get 10
                                    i32.const 114
                                    i32.ne
                                    br_if 1 (;@15;)
                                    local.get 15
                                    i32.load16_u offset=2
                                    i32.const 101
                                    i32.ne
                                    br_if 1 (;@15;)
                                    local.get 15
                                    i32.load16_u offset=4
                                    i32.const 116
                                    i32.ne
                                    br_if 1 (;@15;)
                                    local.get 15
                                    i32.load16_u offset=6
                                    i32.const 117
                                    i32.ne
                                    br_if 1 (;@15;)
                                    local.get 15
                                    i32.load16_u offset=8
                                    i32.const 114
                                    i32.ne
                                    br_if 1 (;@15;)
                                    local.get 15
                                    i32.load16_u offset=10
                                    i32.const 110
                                    i32.eq
                                    br_if 11 (;@5;)
                                    local.get 15
                                    i32.const 1156
                                    i32.ne
                                    br_if 7 (;@9;)
                                    br 11 (;@5;)
                                  end
                                  local.get 15
                                  i32.const 1084
                                  i32.eq
                                  br_if 10 (;@5;)
                                  local.get 10
                                  i32.const 101
                                  i32.ne
                                  br_if 3 (;@12;)
                                  local.get 15
                                  i32.load16_u offset=2
                                  i32.const 108
                                  i32.ne
                                  br_if 3 (;@12;)
                                  local.get 15
                                  i32.load16_u offset=4
                                  i32.const 115
                                  i32.ne
                                  br_if 3 (;@12;)
                                  local.get 15
                                  i32.load16_u offset=6
                                  i32.const 101
                                  i32.eq
                                  br_if 10 (;@5;)
                                  local.get 15
                                  i32.const 1170
                                  i32.ne
                                  br_if 6 (;@9;)
                                  br 10 (;@5;)
                                end
                                local.get 15
                                i32.const 1156
                                i32.eq
                                br_if 9 (;@5;)
                              end
                              local.get 10
                              i32.const 116
                              i32.ne
                              br_if 4 (;@9;)
                              local.get 15
                              i32.load16_u offset=2
                              i32.const 121
                              i32.ne
                              br_if 4 (;@9;)
                              local.get 15
                              i32.load16_u offset=4
                              i32.const 112
                              i32.ne
                              br_if 4 (;@9;)
                              local.get 15
                              i32.load16_u offset=6
                              i32.const 101
                              i32.ne
                              br_if 4 (;@9;)
                              local.get 15
                              i32.load16_u offset=8
                              i32.const 111
                              i32.ne
                              br_if 4 (;@9;)
                              local.get 15
                              i32.load16_u offset=10
                              i32.const 102
                              i32.ne
                              br_if 4 (;@9;)
                              br 8 (;@5;)
                            end
                            local.get 15
                            i32.const 1094
                            i32.eq
                            br_if 7 (;@5;)
                            local.get 10
                            i32.const 105
                            i32.ne
                            br_if 3 (;@9;)
                            local.get 15
                            i32.load16_u offset=2
                            i32.const 110
                            i32.ne
                            br_if 3 (;@9;)
                            br 7 (;@5;)
                          end
                          local.get 15
                          i32.const 1170
                          i32.eq
                          br_if 6 (;@5;)
                        end
                        local.get 10
                        i32.const 118
                        i32.ne
                        br_if 1 (;@9;)
                        local.get 15
                        i32.load16_u offset=2
                        i32.const 111
                        i32.ne
                        br_if 1 (;@9;)
                        local.get 15
                        i32.load16_u offset=4
                        i32.const 105
                        i32.ne
                        br_if 1 (;@9;)
                        local.get 15
                        i32.load16_u offset=6
                        i32.const 100
                        i32.eq
                        br_if 5 (;@5;)
                        br 1 (;@9;)
                      end
                      local.get 15
                      i32.const 1024
                      i32.eq
                      br_if 4 (;@5;)
                      block  ;; label = @10
                        block  ;; label = @11
                          block  ;; label = @12
                            local.get 10
                            i32.const 97
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=2
                            i32.const 119
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=4
                            i32.const 97
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=6
                            i32.const 105
                            i32.eq
                            br_if 1 (;@11;)
                          end
                          local.get 15
                          i32.const 1144
                          i32.eq
                          br_if 6 (;@5;)
                          block  ;; label = @12
                            local.get 10
                            i32.const 116
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=2
                            i32.const 104
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=4
                            i32.const 114
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=6
                            i32.const 111
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 15
                            i32.load16_u offset=8
                            i32.const 119
                            i32.eq
                            br_if 7 (;@5;)
                            local.get 15
                            i32.const 1180
                            i32.ne
                            br_if 2 (;@10;)
                            br 7 (;@5;)
                          end
                          local.get 15
                          i32.const 1180
                          i32.eq
                          br_if 6 (;@5;)
                          br 1 (;@10;)
                        end
                        local.get 15
                        i32.load16_u offset=8
                        i32.const 116
                        i32.eq
                        br_if 5 (;@5;)
                        local.get 15
                        i32.const 1144
                        i32.eq
                        br_if 5 (;@5;)
                        local.get 15
                        i32.const 1180
                        i32.eq
                        br_if 5 (;@5;)
                      end
                      local.get 10
                      i32.const 121
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 15
                      i32.load16_u offset=2
                      i32.const 105
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 15
                      i32.load16_u offset=4
                      i32.const 101
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 15
                      i32.load16_u offset=6
                      i32.const 108
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 15
                      i32.load16_u offset=8
                      i32.const 100
                      i32.eq
                      br_if 4 (;@5;)
                    end
                    local.get 8
                    i32.const 1
                    i32.store
                    local.get 7
                    local.get 17
                    i32.store
                    local.get 5
                    local.get 3
                    i32.const 1
                    i32.add
                    i32.store
                    br 4 (;@4;)
                  end
                  block  ;; label = @8
                    local.get 9
                    i32.const 123
                    i32.eq
                    br_if 0 (;@8;)
                    local.get 9
                    i32.const 40
                    i32.ne
                    br_if 1 (;@7;)
                    local.get 8
                    i32.load
                    local.set 10
                    local.get 7
                    i32.load
                    local.set 9
                    i32.const 0
                    i32.const 0
                    i32.load offset=1952
                    i32.const 1
                    i32.add
                    i32.store offset=1952
                    local.get 8
                    i32.const 1
                    i32.store
                    local.get 7
                    local.get 11
                    local.get 3
                    i32.const 1
                    i32.shl
                    i32.add
                    i32.store
                    local.get 5
                    local.get 3
                    i32.const 1
                    i32.add
                    i32.store
                    local.get 0
                    i32.const 3
                    call $tokenize
                    local.get 8
                    i32.const 1
                    i32.store
                    local.get 5
                    local.get 5
                    i32.load
                    local.tee 14
                    i32.const 1
                    i32.add
                    i32.store
                    local.get 7
                    local.get 0
                    i32.load
                    local.get 14
                    i32.const 1
                    i32.shl
                    i32.add
                    i32.store
                    local.get 0
                    call $consumeWhitespaceAndComments
                    local.get 0
                    i32.load align=1
                    local.get 5
                    i32.load
                    i32.const 1
                    i32.shl
                    i32.add
                    i32.load16_u
                    i32.const 47
                    i32.ne
                    br_if 4 (;@4;)
                    block  ;; label = @9
                      local.get 10
                      i32.const 5
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 9
                      i32.const 1970
                      i32.eq
                      br_if 4 (;@5;)
                      local.get 9
                      i32.load16_u
                      i32.const 119
                      i32.ne
                      br_if 5 (;@4;)
                      local.get 9
                      i32.load16_u offset=2
                      i32.const 104
                      i32.ne
                      br_if 5 (;@4;)
                      local.get 9
                      i32.load16_u offset=4
                      i32.const 105
                      i32.ne
                      br_if 5 (;@4;)
                      local.get 9
                      i32.load16_u offset=6
                      i32.const 108
                      i32.ne
                      br_if 5 (;@4;)
                      local.get 9
                      i32.load16_u offset=8
                      i32.const 101
                      i32.eq
                      br_if 4 (;@5;)
                      br 5 (;@4;)
                    end
                    block  ;; label = @9
                      local.get 10
                      i32.const 3
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 9
                      i32.const 1962
                      i32.eq
                      br_if 4 (;@5;)
                      local.get 9
                      i32.load16_u
                      i32.const 102
                      i32.ne
                      br_if 5 (;@4;)
                      local.get 9
                      i32.load16_u offset=2
                      i32.const 111
                      i32.ne
                      br_if 5 (;@4;)
                      local.get 9
                      i32.load16_u offset=4
                      i32.const 114
                      i32.eq
                      br_if 4 (;@5;)
                      br 5 (;@4;)
                    end
                    local.get 10
                    i32.const 2
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.const 1956
                    i32.eq
                    br_if 3 (;@5;)
                    local.get 9
                    i32.load16_u
                    i32.const 105
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=2
                    i32.const 102
                    i32.eq
                    br_if 3 (;@5;)
                    br 4 (;@4;)
                  end
                  local.get 5
                  local.get 3
                  i32.const 1
                  i32.add
                  i32.store
                  local.get 7
                  i32.load
                  local.set 9
                  local.get 7
                  local.get 11
                  local.get 3
                  i32.const 1
                  i32.shl
                  i32.add
                  i32.store
                  local.get 8
                  i32.load
                  local.set 14
                  local.get 8
                  i32.const 1
                  i32.store
                  local.get 0
                  i32.const 2
                  call $tokenize
                  local.get 8
                  i32.const 1
                  i32.store
                  local.get 5
                  local.get 5
                  i32.load
                  local.tee 10
                  i32.const 1
                  i32.add
                  i32.store
                  local.get 7
                  local.get 0
                  i32.load
                  local.get 10
                  i32.const 1
                  i32.shl
                  i32.add
                  i32.store
                  local.get 0
                  call $consumeWhitespaceAndComments
                  local.get 0
                  i32.load align=1
                  local.get 5
                  i32.load
                  i32.const 1
                  i32.shl
                  i32.add
                  i32.load16_u
                  i32.const 47
                  i32.ne
                  br_if 3 (;@4;)
                  block  ;; label = @8
                    local.get 14
                    i32.const 7
                    i32.ne
                    br_if 0 (;@8;)
                    local.get 9
                    i32.const 1936
                    i32.eq
                    br_if 3 (;@5;)
                    local.get 9
                    i32.load16_u
                    i32.const 102
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=2
                    i32.const 105
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=4
                    i32.const 110
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=6
                    i32.const 97
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=8
                    i32.const 108
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=10
                    i32.const 108
                    i32.ne
                    br_if 4 (;@4;)
                    local.get 9
                    i32.load16_u offset=12
                    i32.const 121
                    i32.eq
                    br_if 3 (;@5;)
                    br 4 (;@4;)
                  end
                  local.get 14
                  i32.const 1
                  i32.ne
                  br_if 3 (;@4;)
                  local.get 9
                  i32.const 1928
                  i32.eq
                  br_if 2 (;@5;)
                  local.get 9
                  i32.const 1932
                  i32.eq
                  br_if 2 (;@5;)
                  local.get 9
                  i32.load16_u
                  local.tee 10
                  i32.const 41
                  i32.eq
                  br_if 2 (;@5;)
                  local.get 10
                  i32.const 59
                  i32.eq
                  br_if 2 (;@5;)
                  br 3 (;@4;)
                end
                local.get 10
                i32.const 65528
                i32.and
                i32.const 40
                i32.eq
                br_if 0 (;@6;)
                local.get 10
                i32.const -58
                i32.add
                i32.const 65535
                i32.and
                i32.const 6
                i32.lt_u
                br_if 0 (;@6;)
                block  ;; label = @7
                  local.get 9
                  i32.const -91
                  i32.add
                  local.tee 14
                  i32.const 3
                  i32.gt_u
                  br_if 0 (;@7;)
                  local.get 14
                  i32.const 1
                  i32.ne
                  br_if 1 (;@6;)
                end
                local.get 10
                i32.const -123
                i32.add
                i32.const 65535
                i32.and
                i32.const 4
                i32.lt_u
                br_if 0 (;@6;)
                local.get 11
                local.get 3
                i32.const 1
                i32.shl
                i32.add
                i32.const 2
                i32.add
                local.tee 12
                local.set 13
                local.get 10
                local.set 14
                local.get 3
                local.set 15
                block  ;; label = @7
                  loop  ;; label = @8
                    block  ;; label = @9
                      local.get 14
                      i32.const 65535
                      i32.and
                      local.tee 11
                      i32.const -9
                      i32.add
                      local.tee 16
                      i32.const 29
                      i32.gt_u
                      br_if 0 (;@9;)
                      i32.const 1
                      local.get 16
                      i32.shl
                      i32.const 830472223
                      i32.and
                      br_if 2 (;@7;)
                    end
                    local.get 11
                    i32.const 160
                    i32.eq
                    br_if 1 (;@7;)
                    local.get 14
                    i32.const 65528
                    i32.and
                    i32.const 40
                    i32.eq
                    br_if 1 (;@7;)
                    local.get 14
                    i32.const -58
                    i32.add
                    i32.const 65535
                    i32.and
                    i32.const 6
                    i32.lt_u
                    br_if 1 (;@7;)
                    block  ;; label = @9
                      local.get 11
                      i32.const -91
                      i32.add
                      local.tee 11
                      i32.const 3
                      i32.gt_u
                      br_if 0 (;@9;)
                      local.get 11
                      i32.const 1
                      i32.ne
                      br_if 2 (;@7;)
                    end
                    local.get 14
                    i32.const -123
                    i32.add
                    i32.const 65535
                    i32.and
                    i32.const 4
                    i32.lt_u
                    br_if 1 (;@7;)
                    local.get 5
                    local.get 15
                    i32.const 1
                    i32.add
                    local.tee 15
                    i32.store
                    local.get 15
                    local.get 4
                    i32.ge_s
                    br_if 1 (;@7;)
                    local.get 13
                    i32.load16_u
                    local.set 14
                    local.get 13
                    i32.const 2
                    i32.add
                    local.set 13
                    br 0 (;@8;)
                  end
                end
                local.get 5
                local.get 3
                i32.store
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        block  ;; label = @11
                          block  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                block  ;; label = @15
                                  block  ;; label = @16
                                    block  ;; label = @17
                                      block  ;; label = @18
                                        block  ;; label = @19
                                          block  ;; label = @20
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  block  ;; label = @24
                                                    block  ;; label = @25
                                                      block  ;; label = @26
                                                        block  ;; label = @27
                                                          block  ;; label = @28
                                                            block  ;; label = @29
                                                              block  ;; label = @30
                                                                block  ;; label = @31
                                                                  block  ;; label = @32
                                                                    block  ;; label = @33
                                                                      block  ;; label = @34
                                                                        block  ;; label = @35
                                                                          block  ;; label = @36
                                                                            local.get 15
                                                                            local.get 3
                                                                            i32.sub
                                                                            i32.const 6
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            block  ;; label = @37
                                                                              local.get 17
                                                                              i32.const 1410
                                                                              i32.eq
                                                                              br_if 0 (;@37;)
                                                                              local.get 9
                                                                              i32.const 105
                                                                              i32.ne
                                                                              br_if 1 (;@36;)
                                                                              i32.const 2
                                                                              local.set 14
                                                                              i32.const 0
                                                                              local.set 15
                                                                              loop  ;; label = @38
                                                                                local.get 15
                                                                                i32.const 1
                                                                                i32.add
                                                                                local.tee 15
                                                                                i32.const 5
                                                                                i32.gt_u
                                                                                br_if 1 (;@37;)
                                                                                local.get 17
                                                                                local.get 14
                                                                                i32.add
                                                                                local.set 11
                                                                                local.get 14
                                                                                i32.const 1410
                                                                                i32.add
                                                                                local.set 13
                                                                                local.get 14
                                                                                i32.const 2
                                                                                i32.add
                                                                                local.set 14
                                                                                local.get 13
                                                                                i32.load16_u
                                                                                local.get 11
                                                                                i32.load16_u
                                                                                i32.eq
                                                                                br_if 0 (;@38;)
                                                                                br 2 (;@36;)
                                                                              end
                                                                            end
                                                                            block  ;; label = @37
                                                                              local.get 8
                                                                              i32.load align=1
                                                                              i32.const 1
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 7
                                                                              i32.load align=1
                                                                              local.tee 15
                                                                              i32.const 1424
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                              local.get 3
                                                                              local.set 14
                                                                              local.get 15
                                                                              i32.load16_u
                                                                              i32.const 46
                                                                              i32.eq
                                                                              br_if 2 (;@35;)
                                                                            end
                                                                            local.get 2
                                                                            i32.const 24
                                                                            i32.add
                                                                            local.get 0
                                                                            call $consumeSequence
                                                                            local.get 0
                                                                            call $consumeWhitespaceAndComments
                                                                            local.get 0
                                                                            i32.load align=1
                                                                            local.get 5
                                                                            i32.load
                                                                            local.tee 14
                                                                            i32.const 1
                                                                            i32.shl
                                                                            i32.add
                                                                            local.tee 9
                                                                            i32.load16_u
                                                                            local.tee 15
                                                                            i32.const -40
                                                                            i32.add
                                                                            local.tee 10
                                                                            i32.const 21
                                                                            i32.gt_u
                                                                            br_if 2 (;@34;)
                                                                            block  ;; label = @37
                                                                              local.get 10
                                                                              br_table 0 (;@37;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 4 (;@33;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 3 (;@34;) 33 (;@4;) 3 (;@34;) 33 (;@4;) 0 (;@37;)
                                                                            end
                                                                            local.get 8
                                                                            i32.const 1
                                                                            i32.store
                                                                            local.get 7
                                                                            local.get 9
                                                                            i32.store
                                                                            local.get 5
                                                                            local.get 14
                                                                            i32.const 1
                                                                            i32.add
                                                                            local.tee 14
                                                                            i32.store
                                                                            local.get 0
                                                                            call $consumeWhitespaceAndComments
                                                                            local.get 0
                                                                            i32.const 3
                                                                            call $tokenize
                                                                            local.get 0
                                                                            call $consumeWhitespaceAndComments
                                                                            local.get 8
                                                                            i32.const 1
                                                                            i32.store
                                                                            local.get 5
                                                                            local.get 5
                                                                            i32.load
                                                                            local.tee 10
                                                                            i32.const 1
                                                                            i32.add
                                                                            local.tee 9
                                                                            i32.store
                                                                            local.get 7
                                                                            local.get 0
                                                                            i32.load
                                                                            local.get 10
                                                                            i32.const 1
                                                                            i32.shl
                                                                            i32.add
                                                                            i32.store
                                                                            local.get 0
                                                                            call $consumeWhitespaceAndComments
                                                                            local.get 0
                                                                            i32.load align=1
                                                                            local.get 5
                                                                            i32.load
                                                                            i32.const 1
                                                                            i32.shl
                                                                            i32.add
                                                                            i32.load16_u
                                                                            i32.const 123
                                                                            i32.eq
                                                                            br_if 32 (;@4;)
                                                                            local.get 3
                                                                            local.get 9
                                                                            local.get 14
                                                                            local.get 10
                                                                            call $emitDynamicImport
                                                                            br 32 (;@4;)
                                                                          end
                                                                          local.get 3
                                                                          local.set 14
                                                                        end
                                                                        block  ;; label = @35
                                                                          loop  ;; label = @36
                                                                            block  ;; label = @37
                                                                              local.get 10
                                                                              i32.const 65535
                                                                              i32.and
                                                                              local.tee 15
                                                                              i32.const -9
                                                                              i32.add
                                                                              local.tee 11
                                                                              i32.const 29
                                                                              i32.gt_u
                                                                              br_if 0 (;@37;)
                                                                              i32.const 1
                                                                              local.get 11
                                                                              i32.shl
                                                                              i32.const 830472223
                                                                              i32.and
                                                                              br_if 2 (;@35;)
                                                                            end
                                                                            local.get 15
                                                                            i32.const 160
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                            local.get 10
                                                                            i32.const 65528
                                                                            i32.and
                                                                            i32.const 40
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                            local.get 10
                                                                            i32.const -58
                                                                            i32.add
                                                                            i32.const 65535
                                                                            i32.and
                                                                            i32.const 6
                                                                            i32.lt_u
                                                                            br_if 1 (;@35;)
                                                                            block  ;; label = @37
                                                                              local.get 15
                                                                              i32.const -91
                                                                              i32.add
                                                                              local.tee 15
                                                                              i32.const 3
                                                                              i32.gt_u
                                                                              br_if 0 (;@37;)
                                                                              local.get 15
                                                                              i32.const 1
                                                                              i32.ne
                                                                              br_if 2 (;@35;)
                                                                            end
                                                                            local.get 10
                                                                            i32.const -123
                                                                            i32.add
                                                                            i32.const 65535
                                                                            i32.and
                                                                            i32.const 4
                                                                            i32.lt_u
                                                                            br_if 1 (;@35;)
                                                                            local.get 5
                                                                            local.get 14
                                                                            i32.const 1
                                                                            i32.add
                                                                            local.tee 14
                                                                            i32.store
                                                                            local.get 14
                                                                            local.get 4
                                                                            i32.ge_s
                                                                            br_if 1 (;@35;)
                                                                            local.get 12
                                                                            i32.load16_u
                                                                            local.set 10
                                                                            local.get 12
                                                                            i32.const 2
                                                                            i32.add
                                                                            local.set 12
                                                                            br 0 (;@36;)
                                                                          end
                                                                        end
                                                                        local.get 5
                                                                        local.get 3
                                                                        i32.store
                                                                        block  ;; label = @35
                                                                          block  ;; label = @36
                                                                            local.get 14
                                                                            local.get 3
                                                                            i32.sub
                                                                            i32.const 6
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            local.get 17
                                                                            i32.const 1428
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                            local.get 9
                                                                            i32.const 101
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            i32.const 2
                                                                            local.set 10
                                                                            i32.const 0
                                                                            local.set 14
                                                                            loop  ;; label = @37
                                                                              local.get 14
                                                                              i32.const 1
                                                                              i32.add
                                                                              local.tee 14
                                                                              i32.const 5
                                                                              i32.gt_u
                                                                              br_if 2 (;@35;)
                                                                              local.get 17
                                                                              local.get 10
                                                                              i32.add
                                                                              local.set 9
                                                                              local.get 10
                                                                              i32.const 1428
                                                                              i32.add
                                                                              local.set 15
                                                                              local.get 10
                                                                              i32.const 2
                                                                              i32.add
                                                                              local.set 10
                                                                              local.get 15
                                                                              i32.load16_u
                                                                              local.get 9
                                                                              i32.load16_u
                                                                              i32.eq
                                                                              br_if 0 (;@37;)
                                                                            end
                                                                          end
                                                                          local.get 2
                                                                          i32.const 24
                                                                          i32.add
                                                                          local.get 0
                                                                          call $consumeSequence
                                                                          br 31 (;@4;)
                                                                        end
                                                                        local.get 2
                                                                        i32.const 24
                                                                        i32.add
                                                                        local.get 0
                                                                        call $consumeSequence
                                                                        local.get 0
                                                                        call $consumeWhitespaceAndComments
                                                                        local.get 0
                                                                        i32.load align=1
                                                                        local.get 5
                                                                        i32.load
                                                                        i32.const 1
                                                                        i32.shl
                                                                        i32.add
                                                                        i32.load16_u
                                                                        local.tee 10
                                                                        i32.const 59
                                                                        i32.eq
                                                                        br_if 30 (;@4;)
                                                                        local.get 10
                                                                        i32.const 61
                                                                        i32.eq
                                                                        br_if 30 (;@4;)
                                                                        local.get 3
                                                                        call $openExport
                                                                        block  ;; label = @35
                                                                          block  ;; label = @36
                                                                            local.get 5
                                                                            i32.load
                                                                            local.tee 14
                                                                            local.get 0
                                                                            i32.const 4
                                                                            i32.add
                                                                            local.tee 18
                                                                            i32.load
                                                                            local.tee 9
                                                                            i32.ge_s
                                                                            br_if 0 (;@36;)
                                                                            local.get 0
                                                                            i32.load align=1
                                                                            local.tee 13
                                                                            local.get 14
                                                                            i32.const 1
                                                                            i32.shl
                                                                            i32.add
                                                                            local.set 4
                                                                            local.get 14
                                                                            local.set 15
                                                                            loop  ;; label = @37
                                                                              block  ;; label = @38
                                                                                local.get 4
                                                                                i32.load16_u
                                                                                local.tee 10
                                                                                i32.const -9
                                                                                i32.add
                                                                                local.tee 11
                                                                                i32.const 29
                                                                                i32.gt_u
                                                                                br_if 0 (;@38;)
                                                                                i32.const 1
                                                                                local.get 11
                                                                                i32.shl
                                                                                i32.const 830472223
                                                                                i32.and
                                                                                br_if 3 (;@35;)
                                                                              end
                                                                              local.get 10
                                                                              i32.const 160
                                                                              i32.eq
                                                                              br_if 2 (;@35;)
                                                                              local.get 10
                                                                              i32.const 65528
                                                                              i32.and
                                                                              i32.const 40
                                                                              i32.eq
                                                                              br_if 2 (;@35;)
                                                                              local.get 10
                                                                              i32.const -58
                                                                              i32.add
                                                                              i32.const 65535
                                                                              i32.and
                                                                              i32.const 6
                                                                              i32.lt_u
                                                                              br_if 2 (;@35;)
                                                                              block  ;; label = @38
                                                                                local.get 10
                                                                                i32.const -91
                                                                                i32.add
                                                                                local.tee 11
                                                                                i32.const 3
                                                                                i32.gt_u
                                                                                br_if 0 (;@38;)
                                                                                local.get 11
                                                                                i32.const 1
                                                                                i32.ne
                                                                                br_if 3 (;@35;)
                                                                              end
                                                                              local.get 10
                                                                              i32.const -123
                                                                              i32.add
                                                                              i32.const 65535
                                                                              i32.and
                                                                              i32.const 4
                                                                              i32.lt_u
                                                                              br_if 2 (;@35;)
                                                                              local.get 5
                                                                              local.get 15
                                                                              i32.const 1
                                                                              i32.add
                                                                              local.tee 15
                                                                              i32.store
                                                                              local.get 4
                                                                              i32.const 2
                                                                              i32.add
                                                                              local.set 4
                                                                              local.get 15
                                                                              local.get 9
                                                                              i32.lt_s
                                                                              br_if 0 (;@37;)
                                                                              br 2 (;@35;)
                                                                            end
                                                                          end
                                                                          local.get 0
                                                                          i32.load
                                                                          local.set 13
                                                                          local.get 14
                                                                          local.set 15
                                                                        end
                                                                        local.get 5
                                                                        local.get 14
                                                                        i32.store
                                                                        local.get 13
                                                                        local.get 14
                                                                        i32.const 1
                                                                        i32.shl
                                                                        local.tee 16
                                                                        i32.add
                                                                        local.set 11
                                                                        block  ;; label = @35
                                                                          block  ;; label = @36
                                                                            block  ;; label = @37
                                                                              local.get 15
                                                                              local.get 14
                                                                              i32.sub
                                                                              i32.const 5
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.const 1522
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                              local.get 11
                                                                              i32.load16_u
                                                                              i32.const 99
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.load16_u offset=2
                                                                              i32.const 111
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.load16_u offset=4
                                                                              i32.const 110
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.load16_u offset=6
                                                                              i32.const 115
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.load16_u offset=8
                                                                              i32.const 116
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                            end
                                                                            local.get 14
                                                                            local.set 15
                                                                            block  ;; label = @37
                                                                              local.get 14
                                                                              local.get 9
                                                                              i32.ge_s
                                                                              local.tee 12
                                                                              br_if 0 (;@37;)
                                                                              local.get 13
                                                                              local.get 16
                                                                              i32.add
                                                                              local.set 4
                                                                              local.get 14
                                                                              local.set 15
                                                                              loop  ;; label = @38
                                                                                block  ;; label = @39
                                                                                  local.get 4
                                                                                  i32.load16_u
                                                                                  local.tee 10
                                                                                  i32.const -9
                                                                                  i32.add
                                                                                  local.tee 17
                                                                                  i32.const 29
                                                                                  i32.gt_u
                                                                                  br_if 0 (;@39;)
                                                                                  i32.const 1
                                                                                  local.get 17
                                                                                  i32.shl
                                                                                  i32.const 830472223
                                                                                  i32.and
                                                                                  br_if 2 (;@37;)
                                                                                end
                                                                                local.get 10
                                                                                i32.const 160
                                                                                i32.eq
                                                                                br_if 1 (;@37;)
                                                                                local.get 10
                                                                                i32.const 65528
                                                                                i32.and
                                                                                i32.const 40
                                                                                i32.eq
                                                                                br_if 1 (;@37;)
                                                                                local.get 10
                                                                                i32.const -58
                                                                                i32.add
                                                                                i32.const 65535
                                                                                i32.and
                                                                                i32.const 6
                                                                                i32.lt_u
                                                                                br_if 1 (;@37;)
                                                                                block  ;; label = @39
                                                                                  local.get 10
                                                                                  i32.const -91
                                                                                  i32.add
                                                                                  local.tee 17
                                                                                  i32.const 3
                                                                                  i32.gt_u
                                                                                  br_if 0 (;@39;)
                                                                                  local.get 17
                                                                                  i32.const 1
                                                                                  i32.ne
                                                                                  br_if 2 (;@37;)
                                                                                end
                                                                                local.get 10
                                                                                i32.const -123
                                                                                i32.add
                                                                                i32.const 65535
                                                                                i32.and
                                                                                i32.const 4
                                                                                i32.lt_u
                                                                                br_if 1 (;@37;)
                                                                                local.get 5
                                                                                local.get 15
                                                                                i32.const 1
                                                                                i32.add
                                                                                local.tee 15
                                                                                i32.store
                                                                                local.get 4
                                                                                i32.const 2
                                                                                i32.add
                                                                                local.set 4
                                                                                local.get 15
                                                                                local.get 9
                                                                                i32.lt_s
                                                                                br_if 0 (;@38;)
                                                                              end
                                                                            end
                                                                            local.get 5
                                                                            local.get 14
                                                                            i32.store
                                                                            block  ;; label = @37
                                                                              local.get 15
                                                                              local.get 14
                                                                              i32.sub
                                                                              i32.const 3
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.const 1534
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                              local.get 11
                                                                              i32.load16_u
                                                                              i32.const 108
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.load16_u offset=2
                                                                              i32.const 101
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 11
                                                                              i32.load16_u offset=4
                                                                              i32.const 116
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                            end
                                                                            local.get 14
                                                                            local.set 15
                                                                            block  ;; label = @37
                                                                              local.get 12
                                                                              br_if 0 (;@37;)
                                                                              local.get 13
                                                                              local.get 16
                                                                              i32.add
                                                                              local.set 4
                                                                              local.get 14
                                                                              local.set 15
                                                                              loop  ;; label = @38
                                                                                block  ;; label = @39
                                                                                  local.get 4
                                                                                  i32.load16_u
                                                                                  local.tee 10
                                                                                  i32.const -9
                                                                                  i32.add
                                                                                  local.tee 17
                                                                                  i32.const 29
                                                                                  i32.gt_u
                                                                                  br_if 0 (;@39;)
                                                                                  i32.const 1
                                                                                  local.get 17
                                                                                  i32.shl
                                                                                  i32.const 830472223
                                                                                  i32.and
                                                                                  br_if 2 (;@37;)
                                                                                end
                                                                                local.get 10
                                                                                i32.const 160
                                                                                i32.eq
                                                                                br_if 1 (;@37;)
                                                                                local.get 10
                                                                                i32.const 65528
                                                                                i32.and
                                                                                i32.const 40
                                                                                i32.eq
                                                                                br_if 1 (;@37;)
                                                                                local.get 10
                                                                                i32.const -58
                                                                                i32.add
                                                                                i32.const 65535
                                                                                i32.and
                                                                                i32.const 6
                                                                                i32.lt_u
                                                                                br_if 1 (;@37;)
                                                                                block  ;; label = @39
                                                                                  local.get 10
                                                                                  i32.const -91
                                                                                  i32.add
                                                                                  local.tee 17
                                                                                  i32.const 3
                                                                                  i32.gt_u
                                                                                  br_if 0 (;@39;)
                                                                                  local.get 17
                                                                                  i32.const 1
                                                                                  i32.ne
                                                                                  br_if 2 (;@37;)
                                                                                end
                                                                                local.get 10
                                                                                i32.const -123
                                                                                i32.add
                                                                                i32.const 65535
                                                                                i32.and
                                                                                i32.const 4
                                                                                i32.lt_u
                                                                                br_if 1 (;@37;)
                                                                                local.get 5
                                                                                local.get 15
                                                                                i32.const 1
                                                                                i32.add
                                                                                local.tee 15
                                                                                i32.store
                                                                                local.get 4
                                                                                i32.const 2
                                                                                i32.add
                                                                                local.set 4
                                                                                local.get 15
                                                                                local.get 9
                                                                                i32.lt_s
                                                                                br_if 0 (;@38;)
                                                                              end
                                                                            end
                                                                            local.get 5
                                                                            local.get 14
                                                                            i32.store
                                                                            local.get 15
                                                                            local.get 14
                                                                            i32.sub
                                                                            i32.const 3
                                                                            i32.ne
                                                                            br_if 1 (;@35;)
                                                                            local.get 11
                                                                            i32.const 1542
                                                                            i32.eq
                                                                            br_if 0 (;@36;)
                                                                            local.get 11
                                                                            i32.load16_u
                                                                            i32.const 118
                                                                            i32.ne
                                                                            br_if 1 (;@35;)
                                                                            local.get 11
                                                                            i32.load16_u offset=2
                                                                            i32.const 97
                                                                            i32.ne
                                                                            br_if 1 (;@35;)
                                                                            local.get 11
                                                                            i32.load16_u offset=4
                                                                            i32.const 114
                                                                            i32.ne
                                                                            br_if 1 (;@35;)
                                                                          end
                                                                          local.get 2
                                                                          i32.const 24
                                                                          i32.add
                                                                          local.get 0
                                                                          call $consumeSequence
                                                                          local.get 0
                                                                          call $consumeWhitespaceAndComments
                                                                          local.get 2
                                                                          i32.const 24
                                                                          i32.add
                                                                          local.get 0
                                                                          call $consumeSequence
                                                                          local.get 2
                                                                          i32.load offset=24
                                                                          local.tee 10
                                                                          local.get 2
                                                                          i32.load offset=28
                                                                          local.tee 14
                                                                          local.get 10
                                                                          local.get 14
                                                                          call $emitExportName
                                                                          local.get 3
                                                                          i32.const 6
                                                                          i32.add
                                                                          call $finalizeExport
                                                                          br 31 (;@4;)
                                                                        end
                                                                        local.get 14
                                                                        local.set 15
                                                                        block  ;; label = @35
                                                                          local.get 12
                                                                          br_if 0 (;@35;)
                                                                          local.get 13
                                                                          local.get 16
                                                                          i32.add
                                                                          local.set 4
                                                                          local.get 14
                                                                          local.set 15
                                                                          loop  ;; label = @36
                                                                            block  ;; label = @37
                                                                              local.get 4
                                                                              i32.load16_u
                                                                              local.tee 10
                                                                              i32.const -9
                                                                              i32.add
                                                                              local.tee 17
                                                                              i32.const 29
                                                                              i32.gt_u
                                                                              br_if 0 (;@37;)
                                                                              i32.const 1
                                                                              local.get 17
                                                                              i32.shl
                                                                              i32.const 830472223
                                                                              i32.and
                                                                              br_if 2 (;@35;)
                                                                            end
                                                                            local.get 10
                                                                            i32.const 160
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                            local.get 10
                                                                            i32.const 65528
                                                                            i32.and
                                                                            i32.const 40
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                            local.get 10
                                                                            i32.const -58
                                                                            i32.add
                                                                            i32.const 65535
                                                                            i32.and
                                                                            i32.const 6
                                                                            i32.lt_u
                                                                            br_if 1 (;@35;)
                                                                            block  ;; label = @37
                                                                              local.get 10
                                                                              i32.const -91
                                                                              i32.add
                                                                              local.tee 17
                                                                              i32.const 3
                                                                              i32.gt_u
                                                                              br_if 0 (;@37;)
                                                                              local.get 17
                                                                              i32.const 1
                                                                              i32.ne
                                                                              br_if 2 (;@35;)
                                                                            end
                                                                            local.get 10
                                                                            i32.const -123
                                                                            i32.add
                                                                            i32.const 65535
                                                                            i32.and
                                                                            i32.const 4
                                                                            i32.lt_u
                                                                            br_if 1 (;@35;)
                                                                            local.get 5
                                                                            local.get 15
                                                                            i32.const 1
                                                                            i32.add
                                                                            local.tee 15
                                                                            i32.store
                                                                            local.get 4
                                                                            i32.const 2
                                                                            i32.add
                                                                            local.set 4
                                                                            local.get 15
                                                                            local.get 9
                                                                            i32.lt_s
                                                                            br_if 0 (;@36;)
                                                                          end
                                                                        end
                                                                        local.get 5
                                                                        local.get 14
                                                                        i32.store
                                                                        block  ;; label = @35
                                                                          block  ;; label = @36
                                                                            local.get 15
                                                                            local.get 14
                                                                            i32.sub
                                                                            i32.const 5
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            local.get 11
                                                                            i32.const 1550
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                            local.get 11
                                                                            i32.load16_u
                                                                            i32.const 97
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            local.get 11
                                                                            i32.load16_u offset=2
                                                                            i32.const 115
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            local.get 11
                                                                            i32.load16_u offset=4
                                                                            i32.const 121
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            local.get 11
                                                                            i32.load16_u offset=6
                                                                            i32.const 110
                                                                            i32.ne
                                                                            br_if 0 (;@36;)
                                                                            local.get 11
                                                                            i32.load16_u offset=8
                                                                            i32.const 99
                                                                            i32.eq
                                                                            br_if 1 (;@35;)
                                                                          end
                                                                          local.get 14
                                                                          local.set 15
                                                                          block  ;; label = @36
                                                                            local.get 12
                                                                            br_if 0 (;@36;)
                                                                            local.get 13
                                                                            local.get 16
                                                                            i32.add
                                                                            local.set 4
                                                                            local.get 14
                                                                            local.set 15
                                                                            loop  ;; label = @37
                                                                              block  ;; label = @38
                                                                                local.get 4
                                                                                i32.load16_u
                                                                                local.tee 10
                                                                                i32.const -9
                                                                                i32.add
                                                                                local.tee 17
                                                                                i32.const 29
                                                                                i32.gt_u
                                                                                br_if 0 (;@38;)
                                                                                i32.const 1
                                                                                local.get 17
                                                                                i32.shl
                                                                                i32.const 830472223
                                                                                i32.and
                                                                                br_if 2 (;@36;)
                                                                              end
                                                                              local.get 10
                                                                              i32.const 160
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                              local.get 10
                                                                              i32.const 65528
                                                                              i32.and
                                                                              i32.const 40
                                                                              i32.eq
                                                                              br_if 1 (;@36;)
                                                                              local.get 10
                                                                              i32.const -58
                                                                              i32.add
                                                                              i32.const 65535
                                                                              i32.and
                                                                              i32.const 6
                                                                              i32.lt_u
                                                                              br_if 1 (;@36;)
                                                                              block  ;; label = @38
                                                                                local.get 10
                                                                                i32.const -91
                                                                                i32.add
                                                                                local.tee 17
                                                                                i32.const 3
                                                                                i32.gt_u
                                                                                br_if 0 (;@38;)
                                                                                local.get 17
                                                                                i32.const 1
                                                                                i32.ne
                                                                                br_if 2 (;@36;)
                                                                              end
                                                                              local.get 10
                                                                              i32.const -123
                                                                              i32.add
                                                                              i32.const 65535
                                                                              i32.and
                                                                              i32.const 4
                                                                              i32.lt_u
                                                                              br_if 1 (;@36;)
                                                                              local.get 5
                                                                              local.get 15
                                                                              i32.const 1
                                                                              i32.add
                                                                              local.tee 15
                                                                              i32.store
                                                                              local.get 4
                                                                              i32.const 2
                                                                              i32.add
                                                                              local.set 4
                                                                              local.get 15
                                                                              local.get 9
                                                                              i32.lt_s
                                                                              br_if 0 (;@37;)
                                                                            end
                                                                          end
                                                                          local.get 5
                                                                          local.get 14
                                                                          i32.store
                                                                          local.get 15
                                                                          local.get 14
                                                                          i32.sub
                                                                          i32.const 8
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.const 1562
                                                                          i32.eq
                                                                          br_if 0 (;@35;)
                                                                          local.get 11
                                                                          i32.load16_u
                                                                          i32.const 102
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=2
                                                                          i32.const 117
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=4
                                                                          i32.const 110
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=6
                                                                          i32.const 99
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=8
                                                                          i32.const 116
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=10
                                                                          i32.const 105
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=12
                                                                          i32.const 111
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                          local.get 11
                                                                          i32.load16_u offset=14
                                                                          i32.const 110
                                                                          i32.ne
                                                                          br_if 3 (;@32;)
                                                                        end
                                                                        local.get 2
                                                                        i32.const 24
                                                                        i32.add
                                                                        local.get 0
                                                                        call $consumeExportFunction
                                                                        local.get 2
                                                                        i32.load offset=24
                                                                        local.tee 10
                                                                        local.get 2
                                                                        i32.load offset=28
                                                                        local.tee 14
                                                                        local.get 10
                                                                        local.get 14
                                                                        call $emitExportName
                                                                        local.get 3
                                                                        i32.const 6
                                                                        i32.add
                                                                        call $finalizeExport
                                                                        br 30 (;@4;)
                                                                      end
                                                                      local.get 3
                                                                      call $openImport
                                                                      block  ;; label = @34
                                                                        local.get 15
                                                                        i32.const 255
                                                                        i32.and
                                                                        local.tee 10
                                                                        i32.const 39
                                                                        i32.eq
                                                                        br_if 0 (;@34;)
                                                                        local.get 10
                                                                        i32.const 34
                                                                        i32.ne
                                                                        br_if 3 (;@31;)
                                                                      end
                                                                      local.get 5
                                                                      local.get 5
                                                                      i32.load
                                                                      local.tee 13
                                                                      i32.const 1
                                                                      i32.add
                                                                      local.tee 10
                                                                      i32.store
                                                                      local.get 13
                                                                      i32.const 1
                                                                      i32.shl
                                                                      local.set 17
                                                                      block  ;; label = @34
                                                                        block  ;; label = @35
                                                                          local.get 10
                                                                          local.get 0
                                                                          i32.const 4
                                                                          i32.add
                                                                          i32.load
                                                                          local.tee 15
                                                                          i32.ge_s
                                                                          br_if 0 (;@35;)
                                                                          local.get 0
                                                                          i32.load align=1
                                                                          local.tee 4
                                                                          local.get 17
                                                                          i32.add
                                                                          local.tee 12
                                                                          i32.load16_u
                                                                          local.set 11
                                                                          local.get 13
                                                                          local.set 9
                                                                          loop  ;; label = @36
                                                                            local.get 4
                                                                            local.get 10
                                                                            i32.const 1
                                                                            i32.shl
                                                                            i32.add
                                                                            i32.load16_u
                                                                            local.tee 3
                                                                            local.get 11
                                                                            i32.const 65535
                                                                            i32.and
                                                                            i32.eq
                                                                            br_if 2 (;@34;)
                                                                            local.get 10
                                                                            local.set 14
                                                                            block  ;; label = @37
                                                                              local.get 3
                                                                              i32.const 92
                                                                              i32.ne
                                                                              br_if 0 (;@37;)
                                                                              local.get 5
                                                                              local.get 9
                                                                              i32.const 2
                                                                              i32.add
                                                                              local.tee 14
                                                                              i32.store
                                                                            end
                                                                            local.get 5
                                                                            local.get 14
                                                                            i32.const 1
                                                                            i32.add
                                                                            local.tee 10
                                                                            i32.store
                                                                            local.get 14
                                                                            local.set 9
                                                                            local.get 10
                                                                            local.get 15
                                                                            i32.lt_s
                                                                            br_if 0 (;@36;)
                                                                          end
                                                                        end
                                                                        i32.const 1354
                                                                        i32.const 27
                                                                        call $syntaxError
                                                                        local.get 0
                                                                        i32.load
                                                                        local.get 17
                                                                        i32.add
                                                                        local.set 12
                                                                        local.get 5
                                                                        i32.load
                                                                        local.set 10
                                                                      end
                                                                      local.get 7
                                                                      local.get 12
                                                                      i32.store
                                                                      local.get 8
                                                                      local.get 10
                                                                      i32.const 1
                                                                      i32.add
                                                                      local.tee 10
                                                                      local.get 13
                                                                      i32.sub
                                                                      i32.store
                                                                      local.get 5
                                                                      local.get 10
                                                                      i32.store
                                                                      local.get 10
                                                                      local.get 7
                                                                      i64.load align=4
                                                                      local.tee 19
                                                                      i32.wrap_i64
                                                                      local.get 19
                                                                      i64.const 32
                                                                      i64.shr_u
                                                                      i32.wrap_i64
                                                                      call $finalizeImport
                                                                      br 29 (;@4;)
                                                                    end
                                                                    local.get 8
                                                                    i32.const 1
                                                                    i32.store
                                                                    local.get 7
                                                                    local.get 9
                                                                    i32.store
                                                                    local.get 5
                                                                    local.get 14
                                                                    i32.const 1
                                                                    i32.add
                                                                    i32.store
                                                                    local.get 0
                                                                    call $consumeWhitespaceAndComments
                                                                    local.get 2
                                                                    i32.const 24
                                                                    i32.add
                                                                    local.get 0
                                                                    call $consumeSequence
                                                                    block  ;; label = @33
                                                                      block  ;; label = @34
                                                                        local.get 2
                                                                        i32.load offset=28
                                                                        i32.const 4
                                                                        i32.ne
                                                                        br_if 0 (;@34;)
                                                                        local.get 2
                                                                        i32.load offset=24
                                                                        local.tee 10
                                                                        i32.const 1698
                                                                        i32.eq
                                                                        br_if 1 (;@33;)
                                                                        local.get 10
                                                                        i32.load16_u
                                                                        i32.const 109
                                                                        i32.ne
                                                                        br_if 0 (;@34;)
                                                                        local.get 10
                                                                        i32.load16_u offset=2
                                                                        i32.const 101
                                                                        i32.ne
                                                                        br_if 0 (;@34;)
                                                                        local.get 10
                                                                        i32.load16_u offset=4
                                                                        i32.const 116
                                                                        i32.ne
                                                                        br_if 0 (;@34;)
                                                                        local.get 10
                                                                        i32.load16_u offset=6
                                                                        i32.const 97
                                                                        i32.eq
                                                                        br_if 1 (;@33;)
                                                                      end
                                                                      i32.const 1708
                                                                      i32.const 49
                                                                      call $syntaxError
                                                                    end
                                                                    local.get 3
                                                                    local.get 5
                                                                    i32.load
                                                                    call $emitImportMeta
                                                                    br 28 (;@4;)
                                                                  end
                                                                  local.get 14
                                                                  local.set 15
                                                                  block  ;; label = @32
                                                                    local.get 12
                                                                    br_if 0 (;@32;)
                                                                    local.get 11
                                                                    local.set 4
                                                                    local.get 14
                                                                    local.set 15
                                                                    loop  ;; label = @33
                                                                      block  ;; label = @34
                                                                        local.get 4
                                                                        i32.load16_u
                                                                        local.tee 10
                                                                        i32.const -9
                                                                        i32.add
                                                                        local.tee 17
                                                                        i32.const 29
                                                                        i32.gt_u
                                                                        br_if 0 (;@34;)
                                                                        i32.const 1
                                                                        local.get 17
                                                                        i32.shl
                                                                        i32.const 830472223
                                                                        i32.and
                                                                        br_if 2 (;@32;)
                                                                      end
                                                                      local.get 10
                                                                      i32.const 160
                                                                      i32.eq
                                                                      br_if 1 (;@32;)
                                                                      local.get 10
                                                                      i32.const 65528
                                                                      i32.and
                                                                      i32.const 40
                                                                      i32.eq
                                                                      br_if 1 (;@32;)
                                                                      local.get 10
                                                                      i32.const -58
                                                                      i32.add
                                                                      i32.const 65535
                                                                      i32.and
                                                                      i32.const 6
                                                                      i32.lt_u
                                                                      br_if 1 (;@32;)
                                                                      block  ;; label = @34
                                                                        local.get 10
                                                                        i32.const -91
                                                                        i32.add
                                                                        local.tee 17
                                                                        i32.const 3
                                                                        i32.gt_u
                                                                        br_if 0 (;@34;)
                                                                        local.get 17
                                                                        i32.const 1
                                                                        i32.ne
                                                                        br_if 2 (;@32;)
                                                                      end
                                                                      local.get 10
                                                                      i32.const -123
                                                                      i32.add
                                                                      i32.const 65535
                                                                      i32.and
                                                                      i32.const 4
                                                                      i32.lt_u
                                                                      br_if 1 (;@32;)
                                                                      local.get 5
                                                                      local.get 15
                                                                      i32.const 1
                                                                      i32.add
                                                                      local.tee 15
                                                                      i32.store
                                                                      local.get 4
                                                                      i32.const 2
                                                                      i32.add
                                                                      local.set 4
                                                                      local.get 15
                                                                      local.get 9
                                                                      i32.lt_s
                                                                      br_if 0 (;@33;)
                                                                    end
                                                                  end
                                                                  local.get 5
                                                                  local.get 14
                                                                  i32.store
                                                                  local.get 15
                                                                  local.get 14
                                                                  i32.sub
                                                                  i32.const 5
                                                                  i32.ne
                                                                  br_if 1 (;@30;)
                                                                  block  ;; label = @32
                                                                    local.get 11
                                                                    i32.const 1580
                                                                    i32.eq
                                                                    br_if 0 (;@32;)
                                                                    local.get 11
                                                                    i32.load16_u
                                                                    local.tee 17
                                                                    i32.const 99
                                                                    i32.ne
                                                                    br_if 3 (;@29;)
                                                                    i32.const 99
                                                                    local.set 17
                                                                    local.get 11
                                                                    i32.load16_u offset=2
                                                                    i32.const 108
                                                                    i32.ne
                                                                    br_if 4 (;@28;)
                                                                    local.get 11
                                                                    i32.load16_u offset=4
                                                                    i32.const 97
                                                                    i32.ne
                                                                    br_if 4 (;@28;)
                                                                    local.get 11
                                                                    i32.load16_u offset=6
                                                                    i32.const 115
                                                                    i32.ne
                                                                    br_if 4 (;@28;)
                                                                    local.get 11
                                                                    i32.load16_u offset=8
                                                                    i32.const 115
                                                                    i32.ne
                                                                    br_if 4 (;@28;)
                                                                  end
                                                                  local.get 2
                                                                  i32.const 24
                                                                  i32.add
                                                                  local.get 0
                                                                  call $consumeSequence
                                                                  local.get 0
                                                                  call $consumeWhitespaceAndComments
                                                                  local.get 0
                                                                  i32.load align=1
                                                                  local.get 5
                                                                  i32.load
                                                                  i32.const 1
                                                                  i32.shl
                                                                  i32.add
                                                                  i32.load16_u
                                                                  local.tee 14
                                                                  i32.const -33
                                                                  i32.add
                                                                  local.tee 10
                                                                  i32.const 5
                                                                  i32.gt_u
                                                                  br_if 12 (;@19;)
                                                                  i32.const 1
                                                                  local.get 10
                                                                  i32.shl
                                                                  i32.const 49
                                                                  i32.and
                                                                  i32.eqz
                                                                  br_if 12 (;@19;)
                                                                  br 13 (;@18;)
                                                                end
                                                                local.get 0
                                                                i32.load align=1
                                                                local.get 5
                                                                i32.load
                                                                local.tee 14
                                                                i32.const 1
                                                                i32.shl
                                                                i32.add
                                                                local.tee 3
                                                                i32.load16_u
                                                                local.tee 10
                                                                i32.const 123
                                                                i32.eq
                                                                br_if 5 (;@25;)
                                                                local.get 10
                                                                i32.const 42
                                                                i32.ne
                                                                br_if 4 (;@26;)
                                                                local.get 8
                                                                i32.const 1
                                                                i32.store
                                                                local.get 5
                                                                local.get 14
                                                                i32.const 2
                                                                i32.add
                                                                i32.store
                                                                local.get 7
                                                                local.get 3
                                                                i32.const 2
                                                                i32.add
                                                                i32.store
                                                                local.get 0
                                                                call $consumeWhitespaceAndComments
                                                                local.get 2
                                                                i32.const 24
                                                                i32.add
                                                                local.get 0
                                                                call $consumeSequence
                                                                local.get 0
                                                                call $consumeWhitespaceAndComments
                                                                local.get 2
                                                                i32.const 24
                                                                i32.add
                                                                local.get 0
                                                                call $consumeSequence
                                                                i32.const 1604
                                                                i32.const 1
                                                                local.get 2
                                                                i32.load offset=24
                                                                local.get 2
                                                                i32.load offset=28
                                                                call $emitImportName
                                                                br 18 (;@12;)
                                                              end
                                                              local.get 11
                                                              i32.load16_u
                                                              local.set 17
                                                            end
                                                            local.get 17
                                                            i32.const 65535
                                                            i32.and
                                                            local.tee 10
                                                            i32.const 42
                                                            i32.eq
                                                            br_if 1 (;@27;)
                                                            local.get 10
                                                            i32.const 123
                                                            i32.ne
                                                            br_if 0 (;@28;)
                                                            local.get 8
                                                            i32.const 1
                                                            i32.store
                                                            local.get 7
                                                            local.get 11
                                                            i32.store
                                                            local.get 5
                                                            local.get 14
                                                            i32.const 1
                                                            i32.add
                                                            local.tee 10
                                                            i32.store
                                                            block  ;; label = @29
                                                              block  ;; label = @30
                                                                local.get 10
                                                                local.get 9
                                                                i32.ge_s
                                                                br_if 0 (;@30;)
                                                                loop  ;; label = @31
                                                                  local.get 13
                                                                  local.get 10
                                                                  i32.const 1
                                                                  i32.shl
                                                                  i32.add
                                                                  local.tee 14
                                                                  i32.load16_u
                                                                  i32.const 125
                                                                  i32.eq
                                                                  br_if 2 (;@29;)
                                                                  local.get 0
                                                                  call $consumeWhitespaceAndComments
                                                                  local.get 2
                                                                  i32.const 24
                                                                  i32.add
                                                                  local.get 0
                                                                  call $consumeSequence
                                                                  local.get 0
                                                                  call $consumeWhitespaceAndComments
                                                                  block  ;; label = @32
                                                                    block  ;; label = @33
                                                                      block  ;; label = @34
                                                                        local.get 0
                                                                        i32.load align=1
                                                                        local.get 5
                                                                        i32.load
                                                                        i32.const 1
                                                                        i32.shl
                                                                        i32.add
                                                                        i32.load16_u
                                                                        local.tee 14
                                                                        i32.const -33
                                                                        i32.add
                                                                        local.tee 10
                                                                        i32.const 5
                                                                        i32.gt_u
                                                                        br_if 0 (;@34;)
                                                                        i32.const 1
                                                                        local.get 10
                                                                        i32.shl
                                                                        i32.const 49
                                                                        i32.and
                                                                        br_if 1 (;@33;)
                                                                      end
                                                                      local.get 14
                                                                      i32.const 65528
                                                                      i32.and
                                                                      i32.const 40
                                                                      i32.eq
                                                                      br_if 0 (;@33;)
                                                                      local.get 14
                                                                      i32.const -58
                                                                      i32.add
                                                                      i32.const 65535
                                                                      i32.and
                                                                      i32.const 6
                                                                      i32.lt_u
                                                                      br_if 0 (;@33;)
                                                                      block  ;; label = @34
                                                                        local.get 14
                                                                        i32.const -91
                                                                        i32.add
                                                                        local.tee 10
                                                                        i32.const 3
                                                                        i32.gt_u
                                                                        br_if 0 (;@34;)
                                                                        local.get 10
                                                                        i32.const 1
                                                                        i32.ne
                                                                        br_if 1 (;@33;)
                                                                      end
                                                                      local.get 14
                                                                      i32.const -123
                                                                      i32.add
                                                                      i32.const 65535
                                                                      i32.and
                                                                      i32.const 4
                                                                      i32.lt_u
                                                                      br_if 0 (;@33;)
                                                                      local.get 2
                                                                      i32.const 16
                                                                      i32.add
                                                                      local.get 0
                                                                      call $consumeSequence
                                                                      local.get 0
                                                                      call $consumeWhitespaceAndComments
                                                                      local.get 2
                                                                      i32.const 16
                                                                      i32.add
                                                                      local.get 0
                                                                      call $consumeSequence
                                                                      local.get 2
                                                                      i32.load offset=24
                                                                      local.get 2
                                                                      i32.load offset=28
                                                                      local.get 2
                                                                      i32.load offset=16
                                                                      local.get 2
                                                                      i32.load offset=20
                                                                      call $emitExportName
                                                                      br 1 (;@32;)
                                                                    end
                                                                    local.get 2
                                                                    i32.load offset=24
                                                                    local.tee 10
                                                                    local.get 2
                                                                    i32.load offset=28
                                                                    local.tee 14
                                                                    local.get 10
                                                                    local.get 14
                                                                    call $emitExportName
                                                                  end
                                                                  local.get 0
                                                                  call $consumeWhitespaceAndComments
                                                                  block  ;; label = @32
                                                                    local.get 0
                                                                    i32.load align=1
                                                                    local.tee 13
                                                                    local.get 5
                                                                    i32.load
                                                                    local.tee 10
                                                                    i32.const 1
                                                                    i32.shl
                                                                    i32.add
                                                                    local.tee 14
                                                                    i32.load16_u
                                                                    i32.const 44
                                                                    i32.ne
                                                                    br_if 0 (;@32;)
                                                                    local.get 8
                                                                    i32.const 1
                                                                    i32.store
                                                                    local.get 7
                                                                    local.get 14
                                                                    i32.store
                                                                    local.get 5
                                                                    local.get 10
                                                                    i32.const 1
                                                                    i32.add
                                                                    local.tee 10
                                                                    i32.store
                                                                  end
                                                                  local.get 10
                                                                  local.get 18
                                                                  i32.load
                                                                  i32.lt_s
                                                                  br_if 0 (;@31;)
                                                                end
                                                              end
                                                              i32.const 1654
                                                              i32.const 21
                                                              call $syntaxError
                                                              local.get 0
                                                              i32.load
                                                              local.get 5
                                                              i32.load
                                                              local.tee 10
                                                              i32.const 1
                                                              i32.shl
                                                              i32.add
                                                              local.set 14
                                                            end
                                                            local.get 8
                                                            i32.const 1
                                                            i32.store
                                                            local.get 7
                                                            local.get 14
                                                            i32.store
                                                            local.get 5
                                                            local.get 10
                                                            i32.const 1
                                                            i32.add
                                                            local.tee 11
                                                            i32.store
                                                            local.get 0
                                                            call $consumeWhitespaceAndComments
                                                            local.get 5
                                                            i32.load
                                                            local.tee 15
                                                            local.get 18
                                                            i32.load
                                                            local.tee 4
                                                            i32.ge_s
                                                            br_if 4 (;@24;)
                                                            local.get 0
                                                            i32.load align=1
                                                            local.tee 13
                                                            local.get 15
                                                            i32.const 1
                                                            i32.shl
                                                            i32.add
                                                            local.set 3
                                                            local.get 15
                                                            local.set 14
                                                            loop  ;; label = @29
                                                              block  ;; label = @30
                                                                local.get 3
                                                                i32.load16_u
                                                                local.tee 10
                                                                i32.const -9
                                                                i32.add
                                                                local.tee 9
                                                                i32.const 29
                                                                i32.gt_u
                                                                br_if 0 (;@30;)
                                                                i32.const 1
                                                                local.get 9
                                                                i32.shl
                                                                i32.const 830472223
                                                                i32.and
                                                                br_if 7 (;@23;)
                                                              end
                                                              local.get 10
                                                              i32.const 160
                                                              i32.eq
                                                              br_if 6 (;@23;)
                                                              local.get 10
                                                              i32.const 65528
                                                              i32.and
                                                              i32.const 40
                                                              i32.eq
                                                              br_if 6 (;@23;)
                                                              local.get 10
                                                              i32.const -58
                                                              i32.add
                                                              i32.const 65535
                                                              i32.and
                                                              i32.const 6
                                                              i32.lt_u
                                                              br_if 6 (;@23;)
                                                              block  ;; label = @30
                                                                local.get 10
                                                                i32.const -91
                                                                i32.add
                                                                local.tee 9
                                                                i32.const 3
                                                                i32.gt_u
                                                                br_if 0 (;@30;)
                                                                local.get 9
                                                                i32.const 1
                                                                i32.ne
                                                                br_if 7 (;@23;)
                                                              end
                                                              local.get 10
                                                              i32.const -123
                                                              i32.add
                                                              i32.const 65535
                                                              i32.and
                                                              i32.const 4
                                                              i32.lt_u
                                                              br_if 6 (;@23;)
                                                              local.get 5
                                                              local.get 14
                                                              i32.const 1
                                                              i32.add
                                                              local.tee 14
                                                              i32.store
                                                              local.get 3
                                                              i32.const 2
                                                              i32.add
                                                              local.set 3
                                                              local.get 14
                                                              local.get 4
                                                              i32.lt_s
                                                              br_if 0 (;@29;)
                                                              br 6 (;@23;)
                                                            end
                                                          end
                                                          local.get 14
                                                          local.set 3
                                                          block  ;; label = @28
                                                            local.get 12
                                                            br_if 0 (;@28;)
                                                            local.get 11
                                                            i32.const 2
                                                            i32.add
                                                            local.set 4
                                                            local.get 17
                                                            local.set 10
                                                            local.get 14
                                                            local.set 3
                                                            loop  ;; label = @29
                                                              block  ;; label = @30
                                                                local.get 10
                                                                i32.const 65535
                                                                i32.and
                                                                local.tee 15
                                                                i32.const -9
                                                                i32.add
                                                                local.tee 13
                                                                i32.const 29
                                                                i32.gt_u
                                                                br_if 0 (;@30;)
                                                                i32.const 1
                                                                local.get 13
                                                                i32.shl
                                                                i32.const 830472223
                                                                i32.and
                                                                br_if 2 (;@28;)
                                                              end
                                                              local.get 15
                                                              i32.const 160
                                                              i32.eq
                                                              br_if 1 (;@28;)
                                                              local.get 10
                                                              i32.const 65528
                                                              i32.and
                                                              i32.const 40
                                                              i32.eq
                                                              br_if 1 (;@28;)
                                                              local.get 10
                                                              i32.const -58
                                                              i32.add
                                                              i32.const 65535
                                                              i32.and
                                                              i32.const 6
                                                              i32.lt_u
                                                              br_if 1 (;@28;)
                                                              block  ;; label = @30
                                                                local.get 15
                                                                i32.const -91
                                                                i32.add
                                                                local.tee 15
                                                                i32.const 3
                                                                i32.gt_u
                                                                br_if 0 (;@30;)
                                                                local.get 15
                                                                i32.const 1
                                                                i32.ne
                                                                br_if 2 (;@28;)
                                                              end
                                                              local.get 10
                                                              i32.const -123
                                                              i32.add
                                                              i32.const 65535
                                                              i32.and
                                                              i32.const 4
                                                              i32.lt_u
                                                              br_if 1 (;@28;)
                                                              local.get 5
                                                              local.get 3
                                                              i32.const 1
                                                              i32.add
                                                              local.tee 3
                                                              i32.store
                                                              local.get 3
                                                              local.get 9
                                                              i32.ge_s
                                                              br_if 1 (;@28;)
                                                              local.get 4
                                                              i32.load16_u
                                                              local.set 10
                                                              local.get 4
                                                              i32.const 2
                                                              i32.add
                                                              local.set 4
                                                              br 0 (;@29;)
                                                            end
                                                          end
                                                          local.get 5
                                                          local.get 14
                                                          i32.store
                                                          block  ;; label = @28
                                                            local.get 3
                                                            local.get 14
                                                            i32.sub
                                                            i32.const 7
                                                            i32.ne
                                                            br_if 0 (;@28;)
                                                            local.get 11
                                                            i32.const 1608
                                                            i32.eq
                                                            br_if 8 (;@20;)
                                                            local.get 17
                                                            i32.const 65535
                                                            i32.and
                                                            i32.const 100
                                                            i32.ne
                                                            br_if 0 (;@28;)
                                                            i32.const 2
                                                            local.set 10
                                                            i32.const 0
                                                            local.set 14
                                                            loop  ;; label = @29
                                                              local.get 14
                                                              i32.const 1
                                                              i32.add
                                                              local.tee 14
                                                              i32.const 6
                                                              i32.gt_u
                                                              br_if 9 (;@20;)
                                                              local.get 11
                                                              local.get 10
                                                              i32.add
                                                              local.set 3
                                                              local.get 10
                                                              i32.const 1608
                                                              i32.add
                                                              local.set 9
                                                              local.get 10
                                                              i32.const 2
                                                              i32.add
                                                              local.set 10
                                                              local.get 9
                                                              i32.load16_u
                                                              local.get 3
                                                              i32.load16_u
                                                              i32.eq
                                                              br_if 0 (;@29;)
                                                            end
                                                          end
                                                          i32.const 1624
                                                          i32.const 14
                                                          call $syntaxError
                                                          br 23 (;@4;)
                                                        end
                                                        local.get 8
                                                        i32.const 1
                                                        i32.store
                                                        local.get 7
                                                        local.get 11
                                                        i32.store
                                                        local.get 5
                                                        local.get 14
                                                        i32.const 1
                                                        i32.add
                                                        i32.store
                                                        local.get 0
                                                        call $consumeWhitespaceAndComments
                                                        local.get 5
                                                        i32.load
                                                        local.tee 15
                                                        local.get 18
                                                        i32.load
                                                        local.tee 4
                                                        i32.ge_s
                                                        br_if 4 (;@22;)
                                                        local.get 0
                                                        i32.load align=1
                                                        local.tee 11
                                                        local.get 15
                                                        i32.const 1
                                                        i32.shl
                                                        i32.add
                                                        local.set 3
                                                        local.get 15
                                                        local.set 14
                                                        loop  ;; label = @27
                                                          block  ;; label = @28
                                                            local.get 3
                                                            i32.load16_u
                                                            local.tee 10
                                                            i32.const -9
                                                            i32.add
                                                            local.tee 9
                                                            i32.const 29
                                                            i32.gt_u
                                                            br_if 0 (;@28;)
                                                            i32.const 1
                                                            local.get 9
                                                            i32.shl
                                                            i32.const 830472223
                                                            i32.and
                                                            br_if 7 (;@21;)
                                                          end
                                                          local.get 10
                                                          i32.const 160
                                                          i32.eq
                                                          br_if 6 (;@21;)
                                                          local.get 10
                                                          i32.const 65528
                                                          i32.and
                                                          i32.const 40
                                                          i32.eq
                                                          br_if 6 (;@21;)
                                                          local.get 10
                                                          i32.const -58
                                                          i32.add
                                                          i32.const 65535
                                                          i32.and
                                                          i32.const 6
                                                          i32.lt_u
                                                          br_if 6 (;@21;)
                                                          block  ;; label = @28
                                                            local.get 10
                                                            i32.const -91
                                                            i32.add
                                                            local.tee 9
                                                            i32.const 3
                                                            i32.gt_u
                                                            br_if 0 (;@28;)
                                                            local.get 9
                                                            i32.const 1
                                                            i32.ne
                                                            br_if 7 (;@21;)
                                                          end
                                                          local.get 10
                                                          i32.const -123
                                                          i32.add
                                                          i32.const 65535
                                                          i32.and
                                                          i32.const 4
                                                          i32.lt_u
                                                          br_if 6 (;@21;)
                                                          local.get 5
                                                          local.get 14
                                                          i32.const 1
                                                          i32.add
                                                          local.tee 14
                                                          i32.store
                                                          local.get 3
                                                          i32.const 2
                                                          i32.add
                                                          local.set 3
                                                          local.get 14
                                                          local.get 4
                                                          i32.lt_s
                                                          br_if 0 (;@27;)
                                                          br 6 (;@21;)
                                                        end
                                                      end
                                                      local.get 2
                                                      i32.const 16
                                                      i32.add
                                                      local.get 0
                                                      call $consumeSequence
                                                      i32.const 1608
                                                      i32.const 7
                                                      local.get 2
                                                      i32.load offset=16
                                                      local.get 2
                                                      i32.load offset=20
                                                      call $emitImportName
                                                      local.get 0
                                                      call $consumeWhitespaceAndComments
                                                      local.get 0
                                                      i32.load align=1
                                                      local.get 5
                                                      i32.load
                                                      local.tee 10
                                                      i32.const 1
                                                      i32.shl
                                                      i32.add
                                                      local.tee 14
                                                      i32.load16_u
                                                      i32.const 44
                                                      i32.ne
                                                      br_if 13 (;@12;)
                                                      local.get 8
                                                      i32.const 1
                                                      i32.store
                                                      local.get 7
                                                      local.get 14
                                                      i32.store
                                                      local.get 5
                                                      local.get 10
                                                      i32.const 1
                                                      i32.add
                                                      i32.store
                                                      local.get 0
                                                      call $consumeWhitespaceAndComments
                                                      local.get 0
                                                      i32.load align=1
                                                      local.get 5
                                                      i32.load
                                                      local.tee 14
                                                      i32.const 1
                                                      i32.shl
                                                      i32.add
                                                      local.tee 3
                                                      i32.load16_u
                                                      local.tee 10
                                                      i32.const 123
                                                      i32.eq
                                                      br_if 0 (;@25;)
                                                      local.get 10
                                                      i32.const 42
                                                      i32.ne
                                                      br_if 12 (;@13;)
                                                      local.get 8
                                                      i32.const 1
                                                      i32.store
                                                      local.get 5
                                                      local.get 14
                                                      i32.const 2
                                                      i32.add
                                                      i32.store
                                                      local.get 7
                                                      local.get 3
                                                      i32.const 2
                                                      i32.add
                                                      i32.store
                                                      local.get 0
                                                      call $consumeWhitespaceAndComments
                                                      local.get 2
                                                      i32.const 24
                                                      i32.add
                                                      local.get 0
                                                      call $consumeSequence
                                                      local.get 0
                                                      call $consumeWhitespaceAndComments
                                                      local.get 2
                                                      i32.const 24
                                                      i32.add
                                                      local.get 0
                                                      call $consumeSequence
                                                      i32.const 1604
                                                      i32.const 1
                                                      local.get 2
                                                      i32.load offset=24
                                                      local.get 2
                                                      i32.load offset=28
                                                      call $emitImportName
                                                      br 13 (;@12;)
                                                    end
                                                    local.get 0
                                                    call $consumeNamedImports
                                                    br 12 (;@12;)
                                                  end
                                                  local.get 0
                                                  i32.load
                                                  local.set 13
                                                  local.get 15
                                                  local.set 14
                                                end
                                                local.get 5
                                                local.get 15
                                                i32.store
                                                block  ;; label = @23
                                                  local.get 14
                                                  local.get 15
                                                  i32.sub
                                                  i32.const 4
                                                  i32.ne
                                                  br_if 0 (;@23;)
                                                  block  ;; label = @24
                                                    local.get 13
                                                    local.get 15
                                                    i32.const 1
                                                    i32.shl
                                                    i32.add
                                                    local.tee 10
                                                    i32.const 1594
                                                    i32.eq
                                                    br_if 0 (;@24;)
                                                    local.get 10
                                                    i32.load16_u
                                                    i32.const 102
                                                    i32.ne
                                                    br_if 1 (;@23;)
                                                    local.get 10
                                                    i32.load16_u offset=2
                                                    i32.const 114
                                                    i32.ne
                                                    br_if 1 (;@23;)
                                                    local.get 10
                                                    i32.load16_u offset=4
                                                    i32.const 111
                                                    i32.ne
                                                    br_if 1 (;@23;)
                                                    local.get 10
                                                    i32.load16_u offset=6
                                                    i32.const 109
                                                    i32.ne
                                                    br_if 1 (;@23;)
                                                  end
                                                  local.get 2
                                                  i32.const 24
                                                  i32.add
                                                  local.get 0
                                                  call $consumeSequence
                                                  local.get 0
                                                  call $consumeWhitespaceAndComments
                                                  local.get 5
                                                  local.get 5
                                                  i32.load
                                                  local.tee 13
                                                  i32.const 1
                                                  i32.add
                                                  local.tee 10
                                                  i32.store
                                                  local.get 13
                                                  i32.const 1
                                                  i32.shl
                                                  local.set 17
                                                  block  ;; label = @24
                                                    block  ;; label = @25
                                                      local.get 10
                                                      local.get 18
                                                      i32.load
                                                      local.tee 15
                                                      i32.ge_s
                                                      br_if 0 (;@25;)
                                                      local.get 0
                                                      i32.load align=1
                                                      local.tee 4
                                                      local.get 17
                                                      i32.add
                                                      local.tee 12
                                                      i32.load16_u
                                                      local.set 11
                                                      local.get 13
                                                      local.set 9
                                                      loop  ;; label = @26
                                                        local.get 4
                                                        local.get 10
                                                        i32.const 1
                                                        i32.shl
                                                        i32.add
                                                        i32.load16_u
                                                        local.tee 3
                                                        local.get 11
                                                        i32.const 65535
                                                        i32.and
                                                        i32.eq
                                                        br_if 2 (;@24;)
                                                        local.get 10
                                                        local.set 14
                                                        block  ;; label = @27
                                                          local.get 3
                                                          i32.const 92
                                                          i32.ne
                                                          br_if 0 (;@27;)
                                                          local.get 5
                                                          local.get 9
                                                          i32.const 2
                                                          i32.add
                                                          local.tee 14
                                                          i32.store
                                                        end
                                                        local.get 5
                                                        local.get 14
                                                        i32.const 1
                                                        i32.add
                                                        local.tee 10
                                                        i32.store
                                                        local.get 14
                                                        local.set 9
                                                        local.get 10
                                                        local.get 15
                                                        i32.lt_s
                                                        br_if 0 (;@26;)
                                                      end
                                                    end
                                                    i32.const 1354
                                                    i32.const 27
                                                    call $syntaxError
                                                    local.get 0
                                                    i32.load
                                                    local.get 17
                                                    i32.add
                                                    local.set 12
                                                    local.get 5
                                                    i32.load
                                                    local.set 10
                                                  end
                                                  local.get 7
                                                  local.get 12
                                                  i32.store
                                                  local.get 8
                                                  local.get 10
                                                  i32.const 1
                                                  i32.add
                                                  local.tee 10
                                                  local.get 13
                                                  i32.sub
                                                  i32.store
                                                  local.get 5
                                                  local.get 10
                                                  i32.store
                                                  local.get 10
                                                  local.get 7
                                                  i64.load align=4
                                                  local.tee 19
                                                  i32.wrap_i64
                                                  local.get 19
                                                  i64.const 32
                                                  i64.shr_u
                                                  i32.wrap_i64
                                                  call $finalizeDelegatedExport
                                                  br 19 (;@4;)
                                                end
                                                local.get 11
                                                call $finalizeExport
                                                br 18 (;@4;)
                                              end
                                              local.get 0
                                              i32.load
                                              local.set 11
                                              local.get 15
                                              local.set 14
                                            end
                                            local.get 5
                                            local.get 15
                                            i32.store
                                            block  ;; label = @21
                                              local.get 14
                                              local.get 15
                                              i32.sub
                                              i32.const 4
                                              i32.ne
                                              br_if 0 (;@21;)
                                              block  ;; label = @22
                                                local.get 11
                                                local.get 15
                                                i32.const 1
                                                i32.shl
                                                i32.add
                                                local.tee 10
                                                i32.const 1594
                                                i32.eq
                                                br_if 0 (;@22;)
                                                local.get 10
                                                i32.load16_u
                                                i32.const 102
                                                i32.ne
                                                br_if 1 (;@21;)
                                                local.get 10
                                                i32.load16_u offset=2
                                                i32.const 114
                                                i32.ne
                                                br_if 1 (;@21;)
                                                local.get 10
                                                i32.load16_u offset=4
                                                i32.const 111
                                                i32.ne
                                                br_if 1 (;@21;)
                                                local.get 10
                                                i32.load16_u offset=6
                                                i32.const 109
                                                i32.ne
                                                br_if 1 (;@21;)
                                              end
                                              local.get 2
                                              i32.const 24
                                              i32.add
                                              local.get 0
                                              call $consumeSequence
                                              local.get 0
                                              call $consumeWhitespaceAndComments
                                              local.get 5
                                              local.get 5
                                              i32.load
                                              local.tee 13
                                              i32.const 1
                                              i32.add
                                              local.tee 10
                                              i32.store
                                              local.get 13
                                              i32.const 1
                                              i32.shl
                                              local.set 17
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  local.get 10
                                                  local.get 18
                                                  i32.load
                                                  local.tee 15
                                                  i32.ge_s
                                                  br_if 0 (;@23;)
                                                  local.get 0
                                                  i32.load align=1
                                                  local.tee 4
                                                  local.get 17
                                                  i32.add
                                                  local.tee 12
                                                  i32.load16_u
                                                  local.set 11
                                                  local.get 13
                                                  local.set 9
                                                  loop  ;; label = @24
                                                    local.get 4
                                                    local.get 10
                                                    i32.const 1
                                                    i32.shl
                                                    i32.add
                                                    i32.load16_u
                                                    local.tee 3
                                                    local.get 11
                                                    i32.const 65535
                                                    i32.and
                                                    i32.eq
                                                    br_if 2 (;@22;)
                                                    local.get 10
                                                    local.set 14
                                                    block  ;; label = @25
                                                      local.get 3
                                                      i32.const 92
                                                      i32.ne
                                                      br_if 0 (;@25;)
                                                      local.get 5
                                                      local.get 9
                                                      i32.const 2
                                                      i32.add
                                                      local.tee 14
                                                      i32.store
                                                    end
                                                    local.get 5
                                                    local.get 14
                                                    i32.const 1
                                                    i32.add
                                                    local.tee 10
                                                    i32.store
                                                    local.get 14
                                                    local.set 9
                                                    local.get 10
                                                    local.get 15
                                                    i32.lt_s
                                                    br_if 0 (;@24;)
                                                  end
                                                end
                                                i32.const 1354
                                                i32.const 27
                                                call $syntaxError
                                                local.get 0
                                                i32.load
                                                local.get 17
                                                i32.add
                                                local.set 12
                                                local.get 5
                                                i32.load
                                                local.set 10
                                              end
                                              local.get 7
                                              local.get 12
                                              i32.store
                                              local.get 8
                                              local.get 10
                                              i32.const 1
                                              i32.add
                                              local.tee 10
                                              local.get 13
                                              i32.sub
                                              i32.store
                                              local.get 5
                                              local.get 10
                                              i32.store
                                              local.get 7
                                              i64.load align=4
                                              local.set 19
                                              i32.const 1604
                                              i32.const 1
                                              i32.const 1604
                                              i32.const 1
                                              call $emitExportName
                                              local.get 5
                                              i32.load
                                              local.get 19
                                              i32.wrap_i64
                                              local.get 19
                                              i64.const 32
                                              i64.shr_u
                                              i32.wrap_i64
                                              call $finalizeDelegatedExport
                                              br 17 (;@4;)
                                            end
                                            local.get 2
                                            i32.const 24
                                            i32.add
                                            local.get 0
                                            call $consumeSequence
                                            local.get 0
                                            call $consumeWhitespaceAndComments
                                            local.get 2
                                            i32.const 24
                                            i32.add
                                            local.get 0
                                            call $consumeSequence
                                            local.get 0
                                            call $consumeWhitespaceAndComments
                                            local.get 2
                                            i32.const 16
                                            i32.add
                                            local.get 0
                                            call $consumeSequence
                                            local.get 0
                                            call $consumeWhitespaceAndComments
                                            local.get 5
                                            local.get 5
                                            i32.load
                                            local.tee 13
                                            i32.const 1
                                            i32.add
                                            local.tee 10
                                            i32.store
                                            local.get 13
                                            i32.const 1
                                            i32.shl
                                            local.set 17
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                local.get 10
                                                local.get 18
                                                i32.load
                                                local.tee 15
                                                i32.ge_s
                                                br_if 0 (;@22;)
                                                local.get 0
                                                i32.load align=1
                                                local.tee 4
                                                local.get 17
                                                i32.add
                                                local.tee 12
                                                i32.load16_u
                                                local.set 11
                                                local.get 13
                                                local.set 9
                                                loop  ;; label = @23
                                                  local.get 4
                                                  local.get 10
                                                  i32.const 1
                                                  i32.shl
                                                  i32.add
                                                  i32.load16_u
                                                  local.tee 3
                                                  local.get 11
                                                  i32.const 65535
                                                  i32.and
                                                  i32.eq
                                                  br_if 2 (;@21;)
                                                  local.get 10
                                                  local.set 14
                                                  block  ;; label = @24
                                                    local.get 3
                                                    i32.const 92
                                                    i32.ne
                                                    br_if 0 (;@24;)
                                                    local.get 5
                                                    local.get 9
                                                    i32.const 2
                                                    i32.add
                                                    local.tee 14
                                                    i32.store
                                                  end
                                                  local.get 5
                                                  local.get 14
                                                  i32.const 1
                                                  i32.add
                                                  local.tee 10
                                                  i32.store
                                                  local.get 14
                                                  local.set 9
                                                  local.get 10
                                                  local.get 15
                                                  i32.lt_s
                                                  br_if 0 (;@23;)
                                                end
                                              end
                                              i32.const 1354
                                              i32.const 27
                                              call $syntaxError
                                              local.get 0
                                              i32.load
                                              local.get 17
                                              i32.add
                                              local.set 12
                                              local.get 5
                                              i32.load
                                              local.set 10
                                            end
                                            local.get 7
                                            local.get 12
                                            i32.store
                                            local.get 8
                                            local.get 10
                                            i32.const 1
                                            i32.add
                                            local.tee 10
                                            local.get 13
                                            i32.sub
                                            i32.store
                                            local.get 5
                                            local.get 10
                                            i32.store
                                            local.get 7
                                            i64.load align=4
                                            local.set 19
                                            i32.const 1604
                                            i32.const 1
                                            local.get 2
                                            i32.load offset=24
                                            local.get 2
                                            i32.load offset=28
                                            call $emitExportName
                                            local.get 5
                                            i32.load
                                            local.get 19
                                            i32.wrap_i64
                                            local.get 19
                                            i64.const 32
                                            i64.shr_u
                                            i32.wrap_i64
                                            call $finalizeDelegatedExport
                                            br 16 (;@4;)
                                          end
                                          local.get 2
                                          i32.const 16
                                          i32.add
                                          local.get 0
                                          call $consumeSequence
                                          local.get 5
                                          i32.load
                                          local.set 17
                                          local.get 0
                                          call $consumeWhitespaceAndComments
                                          local.get 5
                                          i32.load
                                          local.tee 14
                                          local.get 18
                                          i32.load
                                          local.tee 15
                                          i32.ge_s
                                          br_if 4 (;@15;)
                                          local.get 0
                                          i32.load align=1
                                          local.tee 13
                                          local.get 14
                                          i32.const 1
                                          i32.shl
                                          i32.add
                                          local.set 9
                                          local.get 14
                                          local.set 3
                                          loop  ;; label = @20
                                            block  ;; label = @21
                                              local.get 9
                                              i32.load16_u
                                              local.tee 10
                                              i32.const -9
                                              i32.add
                                              local.tee 4
                                              i32.const 29
                                              i32.gt_u
                                              br_if 0 (;@21;)
                                              i32.const 1
                                              local.get 4
                                              i32.shl
                                              i32.const 830472223
                                              i32.and
                                              br_if 7 (;@14;)
                                            end
                                            local.get 10
                                            i32.const 160
                                            i32.eq
                                            br_if 6 (;@14;)
                                            local.get 10
                                            i32.const 65528
                                            i32.and
                                            i32.const 40
                                            i32.eq
                                            br_if 6 (;@14;)
                                            local.get 10
                                            i32.const -58
                                            i32.add
                                            i32.const 65535
                                            i32.and
                                            i32.const 6
                                            i32.lt_u
                                            br_if 6 (;@14;)
                                            block  ;; label = @21
                                              local.get 10
                                              i32.const -91
                                              i32.add
                                              local.tee 4
                                              i32.const 3
                                              i32.gt_u
                                              br_if 0 (;@21;)
                                              local.get 4
                                              i32.const 1
                                              i32.ne
                                              br_if 7 (;@14;)
                                            end
                                            local.get 10
                                            i32.const -123
                                            i32.add
                                            i32.const 65535
                                            i32.and
                                            i32.const 4
                                            i32.lt_u
                                            br_if 6 (;@14;)
                                            local.get 5
                                            local.get 3
                                            i32.const 1
                                            i32.add
                                            local.tee 3
                                            i32.store
                                            local.get 9
                                            i32.const 2
                                            i32.add
                                            local.set 9
                                            local.get 3
                                            local.get 15
                                            i32.lt_s
                                            br_if 0 (;@20;)
                                            br 6 (;@14;)
                                          end
                                        end
                                        local.get 14
                                        i32.const 65528
                                        i32.and
                                        i32.const 40
                                        i32.eq
                                        br_if 0 (;@18;)
                                        local.get 14
                                        i32.const -58
                                        i32.add
                                        i32.const 65535
                                        i32.and
                                        i32.const 6
                                        i32.lt_u
                                        br_if 0 (;@18;)
                                        block  ;; label = @19
                                          local.get 14
                                          i32.const -91
                                          i32.add
                                          local.tee 10
                                          i32.const 3
                                          i32.gt_u
                                          br_if 0 (;@19;)
                                          local.get 10
                                          i32.const 1
                                          i32.ne
                                          br_if 1 (;@18;)
                                        end
                                        local.get 14
                                        i32.const -123
                                        i32.add
                                        i32.const 65535
                                        i32.and
                                        i32.const 3
                                        i32.gt_u
                                        br_if 1 (;@17;)
                                      end
                                      i32.const 0
                                      local.set 10
                                      local.get 2
                                      i32.const 0
                                      i32.store offset=28
                                      i32.const 1592
                                      local.set 14
                                      local.get 2
                                      i32.const 1592
                                      i32.store offset=24
                                      br 1 (;@16;)
                                    end
                                    local.get 2
                                    i32.const 24
                                    i32.add
                                    local.get 0
                                    call $consumeSequence
                                    local.get 2
                                    i32.load offset=28
                                    local.set 10
                                    local.get 2
                                    i32.load offset=24
                                    local.set 14
                                  end
                                  local.get 14
                                  local.get 10
                                  local.get 14
                                  local.get 10
                                  call $emitExportName
                                  local.get 3
                                  i32.const 6
                                  i32.add
                                  call $finalizeExport
                                  br 11 (;@4;)
                                end
                                local.get 0
                                i32.load
                                local.set 13
                                local.get 14
                                local.set 3
                              end
                              local.get 5
                              local.get 14
                              i32.store
                              local.get 13
                              local.get 14
                              i32.const 1
                              i32.shl
                              local.tee 10
                              i32.add
                              local.set 11
                              block  ;; label = @14
                                block  ;; label = @15
                                  block  ;; label = @16
                                    local.get 3
                                    local.get 14
                                    i32.sub
                                    i32.const 5
                                    i32.ne
                                    br_if 0 (;@16;)
                                    local.get 11
                                    i32.const 1550
                                    i32.eq
                                    br_if 1 (;@15;)
                                    local.get 11
                                    i32.load16_u
                                    i32.const 97
                                    i32.ne
                                    br_if 0 (;@16;)
                                    local.get 11
                                    i32.load16_u offset=2
                                    i32.const 115
                                    i32.ne
                                    br_if 0 (;@16;)
                                    local.get 11
                                    i32.load16_u offset=4
                                    i32.const 121
                                    i32.ne
                                    br_if 0 (;@16;)
                                    local.get 11
                                    i32.load16_u offset=6
                                    i32.const 110
                                    i32.ne
                                    br_if 0 (;@16;)
                                    local.get 11
                                    i32.load16_u offset=8
                                    i32.const 99
                                    i32.eq
                                    br_if 1 (;@15;)
                                  end
                                  local.get 14
                                  local.set 3
                                  block  ;; label = @16
                                    local.get 14
                                    local.get 15
                                    i32.ge_s
                                    local.tee 12
                                    br_if 0 (;@16;)
                                    local.get 13
                                    local.get 10
                                    i32.add
                                    local.set 9
                                    local.get 14
                                    local.set 3
                                    loop  ;; label = @17
                                      block  ;; label = @18
                                        local.get 9
                                        i32.load16_u
                                        local.tee 10
                                        i32.const -9
                                        i32.add
                                        local.tee 4
                                        i32.const 29
                                        i32.gt_u
                                        br_if 0 (;@18;)
                                        i32.const 1
                                        local.get 4
                                        i32.shl
                                        i32.const 830472223
                                        i32.and
                                        br_if 2 (;@16;)
                                      end
                                      local.get 10
                                      i32.const 160
                                      i32.eq
                                      br_if 1 (;@16;)
                                      local.get 10
                                      i32.const 65528
                                      i32.and
                                      i32.const 40
                                      i32.eq
                                      br_if 1 (;@16;)
                                      local.get 10
                                      i32.const -58
                                      i32.add
                                      i32.const 65535
                                      i32.and
                                      i32.const 6
                                      i32.lt_u
                                      br_if 1 (;@16;)
                                      block  ;; label = @18
                                        local.get 10
                                        i32.const -91
                                        i32.add
                                        local.tee 4
                                        i32.const 3
                                        i32.gt_u
                                        br_if 0 (;@18;)
                                        local.get 4
                                        i32.const 1
                                        i32.ne
                                        br_if 2 (;@16;)
                                      end
                                      local.get 10
                                      i32.const -123
                                      i32.add
                                      i32.const 65535
                                      i32.and
                                      i32.const 4
                                      i32.lt_u
                                      br_if 1 (;@16;)
                                      local.get 5
                                      local.get 3
                                      i32.const 1
                                      i32.add
                                      local.tee 3
                                      i32.store
                                      local.get 9
                                      i32.const 2
                                      i32.add
                                      local.set 9
                                      local.get 3
                                      local.get 15
                                      i32.lt_s
                                      br_if 0 (;@17;)
                                    end
                                  end
                                  local.get 5
                                  local.get 14
                                  i32.store
                                  local.get 3
                                  local.get 14
                                  i32.sub
                                  i32.const 8
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.const 1562
                                  i32.eq
                                  br_if 0 (;@15;)
                                  local.get 11
                                  i32.load16_u
                                  i32.const 102
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=2
                                  i32.const 117
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=4
                                  i32.const 110
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=6
                                  i32.const 99
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=8
                                  i32.const 116
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=10
                                  i32.const 105
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=12
                                  i32.const 111
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 11
                                  i32.load16_u offset=14
                                  i32.const 110
                                  i32.ne
                                  br_if 1 (;@14;)
                                end
                                local.get 2
                                i32.const 24
                                i32.add
                                local.get 0
                                call $consumeExportFunction
                                local.get 2
                                i32.load offset=28
                                local.tee 10
                                i32.eqz
                                br_if 6 (;@8;)
                                local.get 2
                                i32.load offset=24
                                local.get 10
                                i32.const 1608
                                i32.const 7
                                call $emitExportName
                                local.get 17
                                call $finalizeExport
                                br 10 (;@4;)
                              end
                              local.get 14
                              local.set 3
                              block  ;; label = @14
                                local.get 12
                                br_if 0 (;@14;)
                                local.get 11
                                local.set 9
                                local.get 14
                                local.set 3
                                loop  ;; label = @15
                                  block  ;; label = @16
                                    local.get 9
                                    i32.load16_u
                                    local.tee 10
                                    i32.const -9
                                    i32.add
                                    local.tee 4
                                    i32.const 29
                                    i32.gt_u
                                    br_if 0 (;@16;)
                                    i32.const 1
                                    local.get 4
                                    i32.shl
                                    i32.const 830472223
                                    i32.and
                                    br_if 2 (;@14;)
                                  end
                                  local.get 10
                                  i32.const 160
                                  i32.eq
                                  br_if 1 (;@14;)
                                  local.get 10
                                  i32.const 65528
                                  i32.and
                                  i32.const 40
                                  i32.eq
                                  br_if 1 (;@14;)
                                  local.get 10
                                  i32.const -58
                                  i32.add
                                  i32.const 65535
                                  i32.and
                                  i32.const 6
                                  i32.lt_u
                                  br_if 1 (;@14;)
                                  block  ;; label = @16
                                    local.get 10
                                    i32.const -91
                                    i32.add
                                    local.tee 4
                                    i32.const 3
                                    i32.gt_u
                                    br_if 0 (;@16;)
                                    local.get 4
                                    i32.const 1
                                    i32.ne
                                    br_if 2 (;@14;)
                                  end
                                  local.get 10
                                  i32.const -123
                                  i32.add
                                  i32.const 65535
                                  i32.and
                                  i32.const 4
                                  i32.lt_u
                                  br_if 1 (;@14;)
                                  local.get 5
                                  local.get 3
                                  i32.const 1
                                  i32.add
                                  local.tee 3
                                  i32.store
                                  local.get 9
                                  i32.const 2
                                  i32.add
                                  local.set 9
                                  local.get 3
                                  local.get 15
                                  i32.lt_s
                                  br_if 0 (;@15;)
                                end
                              end
                              local.get 5
                              local.get 14
                              i32.store
                              local.get 3
                              local.get 14
                              i32.sub
                              i32.const 5
                              i32.ne
                              br_if 5 (;@8;)
                              block  ;; label = @14
                                local.get 11
                                i32.const 1580
                                i32.eq
                                br_if 0 (;@14;)
                                local.get 11
                                i32.load16_u
                                i32.const 99
                                i32.ne
                                br_if 6 (;@8;)
                                local.get 11
                                i32.load16_u offset=2
                                i32.const 108
                                i32.ne
                                br_if 6 (;@8;)
                                local.get 11
                                i32.load16_u offset=4
                                i32.const 97
                                i32.ne
                                br_if 6 (;@8;)
                                local.get 11
                                i32.load16_u offset=6
                                i32.const 115
                                i32.ne
                                br_if 6 (;@8;)
                                local.get 11
                                i32.load16_u offset=8
                                i32.const 115
                                i32.ne
                                br_if 6 (;@8;)
                              end
                              local.get 2
                              i32.const 24
                              i32.add
                              local.get 0
                              call $consumeSequence
                              local.get 0
                              call $consumeWhitespaceAndComments
                              local.get 0
                              i32.load align=1
                              local.get 5
                              i32.load
                              i32.const 1
                              i32.shl
                              i32.add
                              i32.load16_u
                              local.tee 14
                              i32.const -33
                              i32.add
                              local.tee 10
                              i32.const 5
                              i32.gt_u
                              br_if 2 (;@11;)
                              i32.const 1
                              local.get 10
                              i32.shl
                              i32.const 49
                              i32.and
                              i32.eqz
                              br_if 2 (;@11;)
                              br 3 (;@10;)
                            end
                            i32.const 1808
                            i32.const 37
                            call $syntaxError
                          end
                          local.get 0
                          call $consumeWhitespaceAndComments
                          local.get 2
                          i32.const 16
                          i32.add
                          local.get 0
                          call $consumeSequence
                          local.get 0
                          call $consumeWhitespaceAndComments
                          local.get 5
                          local.get 5
                          i32.load
                          local.tee 13
                          i32.const 1
                          i32.add
                          local.tee 10
                          i32.store
                          local.get 13
                          i32.const 1
                          i32.shl
                          local.set 17
                          block  ;; label = @12
                            block  ;; label = @13
                              local.get 10
                              local.get 0
                              i32.const 4
                              i32.add
                              i32.load
                              local.tee 15
                              i32.ge_s
                              br_if 0 (;@13;)
                              local.get 0
                              i32.load align=1
                              local.tee 4
                              local.get 17
                              i32.add
                              local.tee 12
                              i32.load16_u
                              local.set 11
                              local.get 13
                              local.set 9
                              loop  ;; label = @14
                                local.get 4
                                local.get 10
                                i32.const 1
                                i32.shl
                                i32.add
                                i32.load16_u
                                local.tee 3
                                local.get 11
                                i32.const 65535
                                i32.and
                                i32.eq
                                br_if 2 (;@12;)
                                local.get 10
                                local.set 14
                                block  ;; label = @15
                                  local.get 3
                                  i32.const 92
                                  i32.ne
                                  br_if 0 (;@15;)
                                  local.get 5
                                  local.get 9
                                  i32.const 2
                                  i32.add
                                  local.tee 14
                                  i32.store
                                end
                                local.get 5
                                local.get 14
                                i32.const 1
                                i32.add
                                local.tee 10
                                i32.store
                                local.get 14
                                local.set 9
                                local.get 10
                                local.get 15
                                i32.lt_s
                                br_if 0 (;@14;)
                              end
                            end
                            i32.const 1354
                            i32.const 27
                            call $syntaxError
                            local.get 0
                            i32.load
                            local.get 17
                            i32.add
                            local.set 12
                            local.get 5
                            i32.load
                            local.set 10
                          end
                          local.get 7
                          local.get 12
                          i32.store
                          local.get 8
                          local.get 10
                          i32.const 1
                          i32.add
                          local.tee 10
                          local.get 13
                          i32.sub
                          i32.store
                          local.get 5
                          local.get 10
                          i32.store
                          local.get 10
                          local.get 7
                          i64.load align=4
                          local.tee 19
                          i32.wrap_i64
                          local.get 19
                          i64.const 32
                          i64.shr_u
                          i32.wrap_i64
                          call $finalizeImport
                          br 7 (;@4;)
                        end
                        local.get 14
                        i32.const 65528
                        i32.and
                        i32.const 40
                        i32.eq
                        br_if 0 (;@10;)
                        local.get 14
                        i32.const -58
                        i32.add
                        i32.const 65535
                        i32.and
                        i32.const 6
                        i32.lt_u
                        br_if 0 (;@10;)
                        block  ;; label = @11
                          local.get 14
                          i32.const -91
                          i32.add
                          local.tee 10
                          i32.const 3
                          i32.gt_u
                          br_if 0 (;@11;)
                          local.get 10
                          i32.const 1
                          i32.ne
                          br_if 1 (;@10;)
                        end
                        local.get 14
                        i32.const -123
                        i32.add
                        i32.const 65535
                        i32.and
                        i32.const 3
                        i32.gt_u
                        br_if 1 (;@9;)
                      end
                      local.get 2
                      i32.const 0
                      i32.store offset=12
                      local.get 2
                      i32.const 1592
                      i32.store offset=8
                      br 1 (;@8;)
                    end
                    local.get 2
                    i32.const 8
                    i32.add
                    local.get 0
                    call $consumeSequence
                    local.get 2
                    i32.load offset=12
                    local.tee 10
                    br_if 1 (;@7;)
                  end
                  i32.const 1608
                  i32.const 7
                  i32.const 1608
                  i32.const 7
                  call $emitExportName
                  local.get 17
                  call $finalizeExport
                  br 3 (;@4;)
                end
                local.get 2
                i32.load offset=8
                local.get 10
                i32.const 1608
                i32.const 7
                call $emitExportName
                local.get 17
                call $finalizeExport
                br 2 (;@4;)
              end
              local.get 8
              i32.const 1
              i32.store
              local.get 7
              local.get 17
              i32.store
              local.get 5
              local.get 3
              i32.const 1
              i32.add
              i32.store
              br 1 (;@4;)
            end
            local.get 0
            call $consumeRegularExpression
          end
          local.get 0
          call $consumeWhitespaceAndComments
          local.get 5
          i32.load
          local.tee 3
          local.get 0
          i32.const 4
          i32.add
          i32.load
          local.tee 4
          i32.lt_s
          br_if 0 (;@3;)
        end
      end
      local.get 1
      i32.const 3
      i32.ne
      br_if 0 (;@1;)
      i32.const 1442
      i32.const 39
      call $syntaxError
    end
    local.get 2
    i32.const 32
    i32.add
    global.set 0)
  (func $consumeSequence (type 0) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        i32.load offset=16
        local.tee 2
        local.get 1
        i32.load offset=4
        local.tee 3
        i32.ge_s
        br_if 0 (;@2;)
        local.get 1
        i32.load align=1
        local.tee 4
        local.get 2
        i32.const 1
        i32.shl
        i32.add
        local.set 5
        local.get 1
        i32.const 16
        i32.add
        local.set 6
        local.get 2
        local.set 7
        loop  ;; label = @3
          block  ;; label = @4
            local.get 5
            i32.load16_u
            local.tee 8
            i32.const -9
            i32.add
            local.tee 9
            i32.const 29
            i32.gt_u
            br_if 0 (;@4;)
            i32.const 1
            local.get 9
            i32.shl
            i32.const 830472223
            i32.and
            br_if 3 (;@1;)
          end
          local.get 8
          i32.const 160
          i32.eq
          br_if 2 (;@1;)
          local.get 8
          i32.const 65528
          i32.and
          i32.const 40
          i32.eq
          br_if 2 (;@1;)
          local.get 8
          i32.const -58
          i32.add
          i32.const 65535
          i32.and
          i32.const 6
          i32.lt_u
          br_if 2 (;@1;)
          block  ;; label = @4
            block  ;; label = @5
              local.get 8
              i32.const 122
              i32.gt_s
              br_if 0 (;@5;)
              block  ;; label = @6
                local.get 8
                i32.const -91
                i32.add
                local.tee 9
                i32.const 3
                i32.gt_u
                br_if 0 (;@6;)
                local.get 9
                i32.const 1
                i32.ne
                br_if 5 (;@1;)
              end
              local.get 8
              i32.const 34
              i32.eq
              br_if 4 (;@1;)
              local.get 8
              i32.const 39
              i32.ne
              br_if 1 (;@4;)
              br 4 (;@1;)
            end
            local.get 8
            i32.const -123
            i32.add
            i32.const 4
            i32.lt_u
            br_if 3 (;@1;)
          end
          local.get 6
          local.get 7
          i32.const 1
          i32.add
          local.tee 7
          i32.store
          local.get 5
          i32.const 2
          i32.add
          local.set 5
          local.get 7
          local.get 3
          i32.lt_s
          br_if 0 (;@3;)
          br 2 (;@1;)
        end
      end
      local.get 1
      i32.load
      local.set 4
      local.get 2
      local.set 7
    end
    local.get 1
    i32.const 12
    i32.add
    local.get 7
    local.get 2
    i32.sub
    i32.store
    local.get 1
    local.get 4
    local.get 2
    i32.const 1
    i32.shl
    i32.add
    i32.store offset=8
    local.get 0
    local.get 1
    i64.load offset=8 align=4
    i64.store align=4)
  (func $consumeExportFunction (type 0) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 2
    global.set 0
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        i32.load offset=16
        local.tee 3
        local.get 1
        i32.load offset=4
        local.tee 4
        i32.ge_s
        br_if 0 (;@2;)
        local.get 1
        i32.load align=1
        local.tee 5
        local.get 3
        i32.const 1
        i32.shl
        i32.add
        local.set 6
        local.get 1
        i32.const 16
        i32.add
        local.set 7
        local.get 3
        local.set 8
        loop  ;; label = @3
          block  ;; label = @4
            local.get 6
            i32.load16_u
            local.tee 9
            i32.const -9
            i32.add
            local.tee 10
            i32.const 29
            i32.gt_u
            br_if 0 (;@4;)
            i32.const 1
            local.get 10
            i32.shl
            i32.const 830472223
            i32.and
            br_if 3 (;@1;)
          end
          local.get 9
          i32.const 160
          i32.eq
          br_if 2 (;@1;)
          local.get 9
          i32.const 65528
          i32.and
          i32.const 40
          i32.eq
          br_if 2 (;@1;)
          local.get 9
          i32.const -58
          i32.add
          i32.const 65535
          i32.and
          i32.const 6
          i32.lt_u
          br_if 2 (;@1;)
          block  ;; label = @4
            local.get 9
            i32.const -91
            i32.add
            local.tee 10
            i32.const 3
            i32.gt_u
            br_if 0 (;@4;)
            local.get 10
            i32.const 1
            i32.ne
            br_if 3 (;@1;)
          end
          local.get 9
          i32.const -123
          i32.add
          i32.const 65535
          i32.and
          i32.const 4
          i32.lt_u
          br_if 2 (;@1;)
          local.get 7
          local.get 8
          i32.const 1
          i32.add
          local.tee 8
          i32.store
          local.get 6
          i32.const 2
          i32.add
          local.set 6
          local.get 8
          local.get 4
          i32.lt_s
          br_if 0 (;@3;)
          br 2 (;@1;)
        end
      end
      local.get 1
      i32.load
      local.set 5
      local.get 3
      local.set 8
    end
    local.get 1
    i32.const 16
    i32.add
    local.tee 9
    local.get 3
    i32.store
    block  ;; label = @1
      local.get 8
      local.get 3
      i32.sub
      i32.const 5
      i32.ne
      br_if 0 (;@1;)
      block  ;; label = @2
        local.get 5
        local.get 3
        i32.const 1
        i32.shl
        i32.add
        local.tee 8
        i32.const 1550
        i32.eq
        br_if 0 (;@2;)
        local.get 8
        i32.load16_u
        i32.const 97
        i32.ne
        br_if 1 (;@1;)
        local.get 8
        i32.load16_u offset=2
        i32.const 115
        i32.ne
        br_if 1 (;@1;)
        local.get 8
        i32.load16_u offset=4
        i32.const 121
        i32.ne
        br_if 1 (;@1;)
        local.get 8
        i32.load16_u offset=6
        i32.const 110
        i32.ne
        br_if 1 (;@1;)
        local.get 8
        i32.load16_u offset=8
        i32.const 99
        i32.ne
        br_if 1 (;@1;)
      end
      local.get 2
      i32.const 8
      i32.add
      local.get 1
      call $consumeSequence
      local.get 1
      call $consumeWhitespaceAndComments
    end
    local.get 2
    i32.const 8
    i32.add
    local.get 1
    call $consumeSequence
    local.get 1
    call $consumeWhitespaceAndComments
    block  ;; label = @1
      local.get 1
      i32.load align=1
      local.get 9
      i32.load
      local.tee 8
      i32.const 1
      i32.shl
      i32.add
      local.tee 6
      i32.load16_u
      local.tee 9
      i32.const 42
      i32.ne
      br_if 0 (;@1;)
      local.get 1
      local.get 6
      i32.store offset=8
      local.get 1
      i32.const 12
      i32.add
      i32.const 1
      i32.store
      local.get 1
      i32.const 16
      i32.add
      local.tee 9
      local.get 8
      i32.const 1
      i32.add
      i32.store
      local.get 1
      call $consumeWhitespaceAndComments
      local.get 1
      i32.load align=1
      local.get 9
      i32.load
      i32.const 1
      i32.shl
      i32.add
      i32.load16_u
      local.set 9
    end
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          local.get 9
          i32.const 65535
          i32.and
          i32.const -33
          i32.add
          local.tee 8
          i32.const 5
          i32.gt_u
          br_if 0 (;@3;)
          i32.const 1
          local.get 8
          i32.shl
          i32.const 49
          i32.and
          br_if 1 (;@2;)
        end
        local.get 9
        i32.const 65528
        i32.and
        i32.const 40
        i32.eq
        br_if 0 (;@2;)
        local.get 9
        i32.const -58
        i32.add
        i32.const 65535
        i32.and
        i32.const 6
        i32.lt_u
        br_if 0 (;@2;)
        block  ;; label = @3
          local.get 9
          i32.const 65535
          i32.and
          i32.const -91
          i32.add
          local.tee 8
          i32.const 3
          i32.gt_u
          br_if 0 (;@3;)
          local.get 8
          i32.const 1
          i32.ne
          br_if 1 (;@2;)
        end
        local.get 9
        i32.const -123
        i32.add
        i32.const 65535
        i32.and
        i32.const 3
        i32.le_u
        br_if 0 (;@2;)
        local.get 0
        local.get 1
        call $consumeSequence
        br 1 (;@1;)
      end
      local.get 0
      i32.const 0
      i32.store offset=4
      local.get 0
      i32.const 1592
      i32.store
    end
    local.get 2
    i32.const 16
    i32.add
    global.set 0)
  (func $consumeNamedImports (type 3) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 1
    global.set 0
    local.get 0
    local.get 0
    i32.load offset=16
    i32.const 1
    i32.add
    local.tee 2
    i32.store offset=16
    block  ;; label = @1
      block  ;; label = @2
        local.get 2
        local.get 0
        i32.load offset=4
        i32.ge_s
        br_if 0 (;@2;)
        local.get 0
        i32.load align=1
        local.set 3
        local.get 0
        i32.const 16
        i32.add
        local.set 4
        local.get 0
        i32.const 12
        i32.add
        local.set 5
        local.get 0
        i32.const 8
        i32.add
        local.set 6
        loop  ;; label = @3
          local.get 3
          local.get 2
          i32.const 1
          i32.shl
          i32.add
          local.tee 3
          i32.load16_u
          i32.const 125
          i32.eq
          br_if 2 (;@1;)
          local.get 0
          call $consumeWhitespaceAndComments
          local.get 1
          i32.const 8
          i32.add
          local.get 0
          call $consumeSequence
          local.get 0
          call $consumeWhitespaceAndComments
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                local.get 0
                i32.load align=1
                local.get 4
                i32.load
                i32.const 1
                i32.shl
                i32.add
                i32.load16_u
                local.tee 3
                i32.const -33
                i32.add
                local.tee 2
                i32.const 5
                i32.gt_u
                br_if 0 (;@6;)
                i32.const 1
                local.get 2
                i32.shl
                i32.const 49
                i32.and
                br_if 1 (;@5;)
              end
              local.get 3
              i32.const 65528
              i32.and
              i32.const 40
              i32.eq
              br_if 0 (;@5;)
              local.get 3
              i32.const -58
              i32.add
              i32.const 65535
              i32.and
              i32.const 6
              i32.lt_u
              br_if 0 (;@5;)
              block  ;; label = @6
                local.get 3
                i32.const -91
                i32.add
                local.tee 2
                i32.const 3
                i32.gt_u
                br_if 0 (;@6;)
                local.get 2
                i32.const 1
                i32.ne
                br_if 1 (;@5;)
              end
              local.get 3
              i32.const -123
              i32.add
              i32.const 65535
              i32.and
              i32.const 4
              i32.lt_u
              br_if 0 (;@5;)
              local.get 1
              local.get 0
              call $consumeSequence
              local.get 0
              call $consumeWhitespaceAndComments
              local.get 1
              local.get 0
              call $consumeSequence
              local.get 1
              i32.load offset=8
              local.get 1
              i32.load offset=12
              local.get 1
              i32.load
              local.get 1
              i32.load offset=4
              call $emitImportName
              br 1 (;@4;)
            end
            local.get 1
            i32.load offset=8
            local.tee 2
            local.get 1
            i32.load offset=12
            local.tee 3
            local.get 2
            local.get 3
            call $emitImportName
          end
          local.get 0
          call $consumeWhitespaceAndComments
          block  ;; label = @4
            local.get 0
            i32.load align=1
            local.tee 3
            local.get 4
            i32.load
            local.tee 2
            i32.const 1
            i32.shl
            i32.add
            local.tee 7
            i32.load16_u
            i32.const 44
            i32.ne
            br_if 0 (;@4;)
            local.get 5
            i32.const 1
            i32.store
            local.get 6
            local.get 7
            i32.store
            local.get 4
            local.get 2
            i32.const 1
            i32.add
            local.tee 2
            i32.store
          end
          local.get 2
          local.get 0
          i32.const 4
          i32.add
          i32.load
          i32.lt_s
          br_if 0 (;@3;)
        end
      end
      i32.const 1884
      i32.const 21
      call $syntaxError
      local.get 0
      i32.load
      local.get 0
      i32.const 16
      i32.add
      i32.load
      local.tee 2
      i32.const 1
      i32.shl
      i32.add
      local.set 3
    end
    local.get 0
    i32.const 12
    i32.add
    i32.const 1
    i32.store
    local.get 0
    i32.const 8
    i32.add
    local.get 3
    i32.store
    local.get 0
    i32.const 16
    i32.add
    local.get 2
    i32.const 1
    i32.add
    i32.store
    local.get 1
    i32.const 16
    i32.add
    global.set 0)
  (func $consumeRegularExpression (type 3) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    local.get 0
    local.get 0
    i32.load offset=16
    local.tee 1
    i32.const 1
    i32.add
    local.tee 2
    i32.store offset=16
    block  ;; label = @1
      block  ;; label = @2
        local.get 2
        local.get 0
        i32.load offset=4
        local.tee 3
        i32.ge_s
        br_if 0 (;@2;)
        local.get 0
        i32.const 16
        i32.add
        local.set 4
        local.get 0
        i32.const 4
        i32.add
        local.set 5
        loop  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                local.get 0
                i32.load align=1
                local.tee 6
                local.get 2
                i32.const 1
                i32.shl
                i32.add
                i32.load16_u
                local.tee 7
                i32.const 91
                i32.eq
                br_if 0 (;@6;)
                local.get 7
                i32.const 92
                i32.eq
                br_if 1 (;@5;)
                local.get 7
                i32.const 47
                i32.eq
                br_if 5 (;@1;)
                local.get 2
                local.set 7
                br 2 (;@4;)
              end
              local.get 4
              local.get 2
              i32.const 1
              i32.add
              local.tee 7
              i32.store
              block  ;; label = @6
                local.get 7
                local.get 3
                i32.ge_s
                br_if 0 (;@6;)
                loop  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      local.get 6
                      local.get 7
                      i32.const 1
                      i32.shl
                      i32.add
                      i32.load16_u
                      local.tee 8
                      i32.const 92
                      i32.eq
                      br_if 0 (;@9;)
                      local.get 8
                      i32.const 93
                      i32.eq
                      br_if 5 (;@4;)
                      local.get 7
                      local.set 2
                      br 1 (;@8;)
                    end
                    local.get 4
                    local.get 2
                    i32.const 2
                    i32.add
                    local.tee 2
                    i32.store
                  end
                  local.get 4
                  local.get 2
                  i32.const 1
                  i32.add
                  local.tee 7
                  i32.store
                  local.get 7
                  local.get 3
                  i32.lt_s
                  br_if 0 (;@7;)
                end
              end
              i32.const 2046
              i32.const 28
              call $syntaxError
              local.get 5
              i32.load
              local.set 3
              local.get 4
              i32.load
              local.set 7
              br 1 (;@4;)
            end
            local.get 4
            local.get 2
            i32.const 1
            i32.add
            local.tee 7
            i32.store
          end
          local.get 4
          local.get 7
          i32.const 1
          i32.add
          local.tee 2
          i32.store
          local.get 2
          local.get 3
          i32.lt_s
          br_if 0 (;@3;)
        end
      end
      i32.const 1982
      i32.const 31
      call $syntaxError
      local.get 0
      i32.const 16
      i32.add
      i32.load
      local.set 2
      local.get 0
      i32.load
      local.set 6
    end
    local.get 0
    i32.const 16
    i32.add
    local.get 2
    i32.const 1
    i32.add
    local.tee 7
    i32.store
    local.get 0
    local.get 6
    local.get 1
    i32.const 1
    i32.shl
    i32.add
    i32.store offset=8
    local.get 0
    i32.const 12
    i32.add
    local.get 7
    local.get 1
    i32.sub
    i32.store)
  (func $parse (type 0) (param i32 i32)
    (local i32)
    global.get 0
    i32.const 32
    i32.sub
    local.tee 2
    global.set 0
    local.get 2
    i32.const 20
    i32.add
    i64.const 0
    i64.store align=4
    local.get 2
    local.get 1
    i32.store offset=12
    local.get 2
    local.get 0
    i32.store offset=8
    local.get 2
    i32.const 1592
    i32.store offset=16
    local.get 2
    i32.const 8
    i32.add
    i32.const 0
    call $tokenize
    local.get 2
    i32.const 32
    i32.add
    global.set 0)
  (table (;0;) 1 1 funcref)
  (memory (;0;) 129)
  (global (;0;) (mut i32) (i32.const 8390720))
  (global (;1;) i32 (i32.const 8390720))
  (global (;2;) i32 (i32.const 2104))
  (export "memory" (memory 0))
  (export "__heap_base" (global 1))
  (export "__data_end" (global 2))
  (export "parse" (func $parse))
  (data (;0;) (i32.const 1024) "a\00w\00a\00i\00t\00\00\00")
  (data (;1;) (i32.const 1036) "c\00a\00s\00e\00\00\00")
  (data (;2;) (i32.const 1046) "d\00e\00b\00u\00g\00g\00e\00r\00\00\00")
  (data (;3;) (i32.const 1064) "d\00e\00l\00e\00t\00e\00\00\00")
  (data (;4;) (i32.const 1078) "d\00o\00\00\00")
  (data (;5;) (i32.const 1084) "e\00l\00s\00e\00\00\00")
  (data (;6;) (i32.const 1094) "i\00n\00\00\00")
  (data (;7;) (i32.const 1100) "i\00n\00s\00t\00a\00n\00c\00e\00o\00f\00\00\00")
  (data (;8;) (i32.const 1122) "n\00e\00w\00\00\00")
  (data (;9;) (i32.const 1130) "r\00e\00t\00u\00r\00n\00\00\00")
  (data (;10;) (i32.const 1144) "t\00h\00r\00o\00w\00\00\00")
  (data (;11;) (i32.const 1156) "t\00y\00p\00e\00o\00f\00\00\00")
  (data (;12;) (i32.const 1170) "v\00o\00i\00d\00\00\00")
  (data (;13;) (i32.const 1180) "y\00i\00e\00l\00d\00\00\00")
  (data (;14;) (i32.const 1192) "/\00/\00\00\00")
  (data (;15;) (i32.const 1198) "/\00*\00\00\00")
  (data (;16;) (i32.const 1204) "F\00a\00i\00l\00e\00d\00 \00t\00o\00 \00c\00o\00n\00s\00u\00m\00e\00 \00b\00l\00o\00c\00k\00 \00c\00o\00m\00m\00e\00n\00t\00\00\00")
  (data (;17;) (i32.const 1268) "*\00/\00\00\00")
  (data (;18;) (i32.const 1274) "$\00{\00\00\00")
  (data (;19;) (i32.const 1280) "T\00e\00m\00p\00l\00a\00t\00e\00 \00l\00i\00t\00e\00r\00a\00l\00 \00r\00e\00a\00c\00h\00e\00d\00 \00e\00n\00d\00 \00o\00f\00 \00c\00o\00d\00e\00\00\00")
  (data (;20;) (i32.const 1354) "U\00n\00t\00e\00r\00m\00i\00n\00a\00t\00e\00d\00 \00s\00t\00r\00i\00n\00g\00 \00l\00i\00t\00e\00r\00a\00l\00\00\00")
  (data (;21;) (i32.const 1410) "i\00m\00p\00o\00r\00t\00\00\00")
  (data (;22;) (i32.const 1424) ".\00\00\00")
  (data (;23;) (i32.const 1428) "e\00x\00p\00o\00r\00t\00\00\00")
  (data (;24;) (i32.const 1442) "R\00e\00a\00c\00h\00e\00d\00 \00e\00n\00d\00 \00w\00i\00t\00h\00o\00u\00t\00 \00c\00l\00o\00s\00i\00n\00g\00 \00p\00a\00r\00e\00n\00t\00h\00e\00s\00i\00s\00\00\00")
  (data (;25;) (i32.const 1522) "c\00o\00n\00s\00t\00\00\00")
  (data (;26;) (i32.const 1534) "l\00e\00t\00\00\00")
  (data (;27;) (i32.const 1542) "v\00a\00r\00\00\00")
  (data (;28;) (i32.const 1550) "a\00s\00y\00n\00c\00\00\00")
  (data (;29;) (i32.const 1562) "f\00u\00n\00c\00t\00i\00o\00n\00\00\00")
  (data (;30;) (i32.const 1580) "c\00l\00a\00s\00s\00\00\00")
  (data (;31;) (i32.const 1592) "\00\00")
  (data (;32;) (i32.const 1594) "f\00r\00o\00m\00\00\00")
  (data (;33;) (i32.const 1604) "*\00\00\00")
  (data (;34;) (i32.const 1608) "d\00e\00f\00a\00u\00l\00t\00\00\00")
  (data (;35;) (i32.const 1624) "I\00n\00v\00a\00l\00i\00d\00 \00e\00x\00p\00o\00r\00t\00\00\00")
  (data (;36;) (i32.const 1654) "U\00n\00c\00l\00o\00s\00e\00d\00 \00n\00a\00m\00e\00d\00 \00e\00x\00p\00o\00r\00t\00\00\00")
  (data (;37;) (i32.const 1698) "m\00e\00t\00a\00\00\00")
  (data (;38;) (i32.const 1708) "i\00m\00p\00o\00r\00t\00.\00m\00e\00t\00a\00 \00i\00s\00 \00o\00n\00l\00y\00 \00i\00m\00p\00o\00r\00t\00 \00m\00e\00t\00a\00p\00r\00o\00p\00e\00r\00t\00y\00 \00s\00u\00p\00p\00o\00r\00t\00e\00d\00\00\00")
  (data (;39;) (i32.const 1808) "U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00t\00o\00k\00e\00n\00 \00a\00f\00t\00e\00r\00 \00d\00e\00f\00a\00u\00l\00t\00 \00i\00m\00p\00o\00r\00t\00\00\00")
  (data (;40;) (i32.const 1884) "U\00n\00c\00l\00o\00s\00e\00d\00 \00n\00a\00m\00e\00d\00 \00i\00m\00p\00o\00r\00t\00\00\00")
  (data (;41;) (i32.const 1928) ";\00\00\00")
  (data (;42;) (i32.const 1932) ")\00\00\00")
  (data (;43;) (i32.const 1936) "f\00i\00n\00a\00l\00l\00y\00\00\00")
  (data (;44;) (i32.const 1952) "\00\00\00\00")
  (data (;45;) (i32.const 1956) "i\00f\00\00\00")
  (data (;46;) (i32.const 1962) "f\00o\00r\00\00\00")
  (data (;47;) (i32.const 1970) "w\00h\00i\00l\00e\00\00\00")
  (data (;48;) (i32.const 1982) "U\00n\00t\00e\00r\00m\00i\00n\00a\00t\00e\00d\00 \00R\00e\00g\00u\00l\00a\00r\00 \00E\00x\00p\00r\00e\00s\00s\00i\00o\00n\00\00\00")
  (data (;49;) (i32.const 2046) "U\00n\00t\00e\00r\00m\00i\00n\00a\00t\00e\00d\00 \00C\00h\00a\00r\00a\00c\00t\00e\00r\00 \00C\00l\00a\00s\00s\00\00\00"))
