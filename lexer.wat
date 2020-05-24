(module
  (type (;0;) (func (param i32 i32)))
  (type (;1;) (func (param i32)))
  (type (;2;) (func (param i32 i32 i32 i32)))
  (type (;3;) (func (param i32 i32 i32)))
  (type (;4;) (func (param i32) (result i32)))
  (import "env" "syntaxError" (func (;0;) (type 0)))
  (import "env" "finalizeImport" (func (;1;) (type 3)))
  (import "env" "emitImportName" (func (;2;) (type 2)))
  (import "env" "emitDynamicImport" (func (;3;) (type 2)))
  (import "env" "emitImportMeta" (func (;4;) (type 0)))
  (import "env" "openImport" (func (;5;) (type 1)))
  (func (;6;) (type 1) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32)
    block  ;; label = @1
      local.get 0
      i32.load offset=4
      local.tee 5
      local.get 0
      i32.load offset=16
      local.tee 2
      i32.le_s
      br_if 0 (;@1;)
      loop  ;; label = @2
        local.get 0
        i32.load align=1
        local.get 2
        i32.const 1
        i32.shl
        i32.add
        local.tee 3
        i32.load16_u
        local.set 6
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  local.get 5
                  local.get 2
                  i32.sub
                  i32.const 2
                  i32.ne
                  i32.const 0
                  local.get 5
                  local.get 2
                  i32.const 2
                  i32.add
                  local.tee 9
                  i32.lt_s
                  select
                  i32.eqz
                  if  ;; label = @8
                    local.get 3
                    i32.const 1192
                    i32.eq
                    br_if 2 (;@6;)
                    local.get 6
                    i32.const 47
                    i32.eq
                    if  ;; label = @9
                      i32.const 2
                      local.set 1
                      loop  ;; label = @10
                        local.get 1
                        i32.const 2
                        i32.add
                        local.tee 4
                        i32.const 6
                        i32.eq
                        br_if 4 (;@6;)
                        local.get 1
                        local.get 3
                        i32.add
                        local.set 7
                        local.get 1
                        i32.const 1192
                        i32.add
                        local.get 4
                        local.set 1
                        i32.load16_u
                        local.get 7
                        i32.load16_u
                        i32.eq
                        br_if 0 (;@10;)
                      end
                    end
                    local.get 3
                    i32.const 1198
                    i32.eq
                    br_if 1 (;@7;)
                    local.get 6
                    i32.const -9
                    i32.add
                    local.tee 1
                    i32.const 38
                    i32.gt_u
                    if  ;; label = @9
                      local.get 6
                      i32.const 160
                      i32.eq
                      br_if 4 (;@5;)
                      br 8 (;@1;)
                    end
                    block  ;; label = @9
                      local.get 1
                      i32.const 5
                      i32.sub
                      br_table 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 4 (;@5;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 8 (;@1;) 0 (;@9;) 4 (;@5;)
                    end
                    i32.const 2
                    local.set 1
                    loop  ;; label = @9
                      local.get 1
                      i32.const 2
                      i32.add
                      local.tee 4
                      i32.const 6
                      i32.eq
                      br_if 2 (;@7;)
                      local.get 1
                      local.get 3
                      i32.add
                      local.set 7
                      local.get 1
                      i32.const 1198
                      i32.add
                      local.get 4
                      local.set 1
                      i32.load16_u
                      local.get 7
                      i32.load16_u
                      i32.eq
                      br_if 0 (;@9;)
                    end
                  end
                  local.get 6
                  i32.const 160
                  i32.eq
                  local.get 6
                  i32.const -9
                  i32.add
                  i32.const 5
                  i32.lt_u
                  i32.or
                  br_if 2 (;@5;)
                  local.get 6
                  i32.const 32
                  i32.ne
                  br_if 6 (;@1;)
                  br 2 (;@5;)
                end
                local.get 0
                local.get 9
                i32.store offset=16
                local.get 5
                local.get 9
                i32.gt_s
                if  ;; label = @7
                  local.get 2
                  i32.const 4
                  i32.add
                  local.set 2
                  i32.const 2
                  local.get 5
                  i32.sub
                  local.set 4
                  local.get 3
                  i32.const 4
                  i32.add
                  local.set 1
                  loop  ;; label = @8
                    block  ;; label = @9
                      local.get 5
                      local.get 2
                      i32.lt_s
                      br_if 0 (;@9;)
                      local.get 1
                      i32.const 1268
                      i32.eq
                      br_if 5 (;@4;)
                      local.get 1
                      i32.load16_u
                      i32.const 42
                      i32.ne
                      br_if 0 (;@9;)
                      local.get 1
                      i32.const 2
                      i32.add
                      i32.load16_u
                      i32.const 47
                      i32.eq
                      br_if 5 (;@4;)
                    end
                    local.get 0
                    local.get 2
                    i32.const -1
                    i32.add
                    i32.store offset=16
                    local.get 1
                    i32.const 2
                    i32.add
                    local.set 1
                    local.get 4
                    local.get 2
                    i32.const 1
                    i32.add
                    local.tee 2
                    i32.add
                    i32.const 4
                    i32.ne
                    br_if 0 (;@8;)
                  end
                end
                i32.const 1204
                i32.const 31
                call 0
                local.get 0
                i32.load offset=4
                local.set 5
                local.get 0
                i32.load offset=16
                local.set 2
                br 3 (;@3;)
              end
              local.get 3
              i32.const 2
              i32.add
              local.set 1
              loop  ;; label = @6
                local.get 2
                i32.const 1
                i32.add
                local.tee 4
                local.get 5
                i32.ge_s
                br_if 1 (;@5;)
                local.get 1
                i32.load16_u
                local.get 1
                i32.const 2
                i32.add
                local.set 1
                local.get 4
                local.set 2
                i32.const -10
                i32.add
                local.tee 4
                i32.const 3
                i32.gt_u
                local.tee 3
                br_if 0 (;@6;)
                block  ;; label = @7
                  local.get 4
                  i32.const 1
                  i32.sub
                  br_table 1 (;@6;) 1 (;@6;) 0 (;@7;)
                end
              end
              local.get 0
              local.get 2
              i32.store offset=16
              local.get 3
              br_if 2 (;@3;)
              block  ;; label = @6
                local.get 4
                i32.const 1
                i32.sub
                br_table 3 (;@3;) 3 (;@3;) 0 (;@6;)
              end
              local.get 2
              i32.const 1
              i32.add
              local.set 2
              br 1 (;@4;)
            end
            local.get 2
            i32.const 1
            i32.add
            local.set 2
          end
          local.get 0
          local.get 2
          i32.store offset=16
        end
        local.get 5
        local.get 2
        i32.gt_s
        br_if 0 (;@2;)
      end
    end)
  (func (;7;) (type 4) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
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
    local.tee 6
    local.get 1
    i32.const 1
    i32.shl
    i32.add
    i32.load16_u
    local.set 7
    block  ;; label = @1
      local.get 0
      i32.load offset=4
      local.tee 4
      local.get 2
      i32.gt_s
      if  ;; label = @2
        loop  ;; label = @3
          local.get 6
          local.get 2
          i32.const 1
          i32.shl
          i32.add
          local.tee 5
          i32.load16_u
          local.tee 3
          i32.const 96
          i32.eq
          if  ;; label = @4
            i32.const 96
            local.set 3
            br 3 (;@1;)
          end
          block  ;; label = @4
            block  ;; label = @5
              local.get 4
              local.get 2
              i32.sub
              i32.const 2
              i32.ne
              i32.const 0
              local.get 4
              local.get 1
              local.tee 8
              i32.const 3
              i32.add
              i32.lt_s
              select
              i32.eqz
              if  ;; label = @6
                local.get 5
                i32.const 1274
                i32.eq
                br_if 5 (;@1;)
                local.get 3
                i32.const 92
                i32.eq
                br_if 1 (;@5;)
                local.get 3
                i32.const 36
                i32.ne
                if  ;; label = @7
                  local.get 2
                  local.set 1
                  br 3 (;@4;)
                end
                i32.const 2
                local.set 1
                loop  ;; label = @7
                  local.get 1
                  i32.const 2
                  i32.add
                  local.tee 9
                  i32.const 6
                  i32.eq
                  if  ;; label = @8
                    i32.const 36
                    local.set 3
                    br 7 (;@1;)
                  end
                  local.get 1
                  local.get 5
                  i32.add
                  local.set 10
                  local.get 1
                  i32.const 1274
                  i32.add
                  local.get 9
                  local.set 1
                  i32.load16_u
                  local.get 10
                  i32.load16_u
                  i32.eq
                  br_if 0 (;@7;)
                end
              end
              local.get 2
              local.set 1
              local.get 3
              i32.const 92
              i32.ne
              br_if 1 (;@4;)
            end
            local.get 0
            local.get 8
            i32.const 2
            i32.add
            local.tee 1
            i32.store offset=16
          end
          local.get 0
          local.get 1
          i32.const 1
          i32.add
          local.tee 2
          i32.store offset=16
          local.get 4
          local.get 2
          i32.gt_s
          br_if 0 (;@3;)
        end
      end
      i32.const 1280
      i32.const 36
      call 0
      local.get 0
      i32.load align=1
      local.get 0
      i32.load offset=16
      local.tee 2
      i32.const 1
      i32.shl
      i32.add
      i32.load16_u
      local.set 3
    end
    local.get 0
    local.get 2
    i32.const 1
    i32.const 2
    local.get 3
    i32.const 96
    i32.eq
    local.tee 0
    select
    local.tee 1
    i32.add
    i32.store offset=16
    local.get 1
    i32.const 4
    i32.const 3
    local.get 0
    select
    local.get 7
    i32.const 96
    i32.eq
    select)
  (func (;8;) (type 0) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i64)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 8
    global.set 0
    local.get 0
    call 6
    block  ;; label = @1
      local.get 0
      i32.load offset=16
      local.tee 5
      local.get 0
      i32.load offset=4
      local.tee 11
      i32.lt_s
      if  ;; label = @2
        local.get 1
        i32.const -1
        i32.add
        local.tee 13
        i32.const 2
        i32.gt_u
        local.set 14
        loop  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  local.get 14
                  i32.eqz
                  if  ;; label = @8
                    local.get 13
                    i32.const 1
                    i32.sub
                    br_table 2 (;@6;) 1 (;@7;) 3 (;@5;)
                  end
                  local.get 0
                  i32.load align=1
                  local.tee 4
                  local.get 5
                  i32.const 1
                  i32.shl
                  i32.add
                  i32.load16_u
                  local.set 3
                  br 3 (;@4;)
                end
                local.get 0
                i32.load align=1
                local.tee 4
                local.get 5
                i32.const 1
                i32.shl
                i32.add
                i32.load16_u
                local.tee 3
                i32.const 41
                i32.ne
                br_if 2 (;@4;)
                br 5 (;@1;)
              end
              local.get 0
              i32.load align=1
              local.tee 4
              local.get 5
              i32.const 1
              i32.shl
              i32.add
              i32.load16_u
              local.tee 3
              i32.const 125
              i32.ne
              br_if 1 (;@4;)
              br 4 (;@1;)
            end
            local.get 0
            i32.load align=1
            local.tee 4
            local.get 5
            i32.const 1
            i32.shl
            i32.add
            i32.load16_u
            local.tee 3
            i32.const 96
            i32.eq
            local.get 3
            i32.const 125
            i32.eq
            i32.or
            br_if 3 (;@1;)
          end
          local.get 5
          i32.const 1
          i32.shl
          local.set 7
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        block  ;; label = @11
                          block  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                local.get 3
                                i32.const 65535
                                i32.and
                                local.tee 10
                                i32.const 96
                                i32.ne
                                if  ;; label = @15
                                  local.get 4
                                  local.get 7
                                  i32.add
                                  local.set 9
                                  local.get 10
                                  i32.const 47
                                  i32.ne
                                  br_if 1 (;@14;)
                                  local.get 0
                                  i32.load offset=12
                                  local.tee 4
                                  i32.eqz
                                  br_if 10 (;@5;)
                                  local.get 0
                                  i32.load offset=8 align=1
                                  local.tee 2
                                  i32.load16_u
                                  local.tee 3
                                  i32.const -33
                                  i32.add
                                  local.tee 6
                                  i32.const 5
                                  i32.le_u
                                  i32.const 0
                                  i32.const 1
                                  local.get 6
                                  i32.shl
                                  i32.const 49
                                  i32.and
                                  select
                                  local.get 3
                                  i32.const 41
                                  i32.ne
                                  local.get 3
                                  i32.const -40
                                  i32.add
                                  i32.const 65535
                                  i32.and
                                  i32.const 7
                                  i32.lt_u
                                  i32.and
                                  local.get 3
                                  i32.const -58
                                  i32.add
                                  i32.const 65535
                                  i32.and
                                  i32.const 6
                                  i32.lt_u
                                  i32.or
                                  i32.or
                                  br_if 10 (;@5;)
                                  block  ;; label = @16
                                    local.get 3
                                    i32.const -91
                                    i32.add
                                    local.tee 6
                                    i32.const 3
                                    i32.gt_u
                                    br_if 0 (;@16;)
                                    local.get 6
                                    i32.const 1
                                    i32.sub
                                    br_table 0 (;@16;) 0 (;@16;) 11 (;@5;)
                                  end
                                  local.get 3
                                  i32.const 125
                                  i32.ne
                                  i32.const 0
                                  local.get 3
                                  i32.const -123
                                  i32.add
                                  i32.const 65535
                                  i32.and
                                  i32.const 4
                                  i32.lt_u
                                  select
                                  br_if 10 (;@5;)
                                  block  ;; label = @16
                                    local.get 4
                                    i32.const 5
                                    i32.eq
                                    if  ;; label = @17
                                      local.get 2
                                      i32.const 1024
                                      i32.eq
                                      br_if 12 (;@5;)
                                      local.get 3
                                      i32.const 97
                                      i32.ne
                                      br_if 9 (;@8;)
                                      local.get 2
                                      i32.load16_u offset=2
                                      i32.const 119
                                      i32.eq
                                      br_if 1 (;@16;)
                                      br 9 (;@8;)
                                    end
                                    local.get 4
                                    i32.const -2
                                    i32.add
                                    local.tee 4
                                    i32.const 8
                                    i32.gt_u
                                    br_if 10 (;@6;)
                                    block  ;; label = @17
                                      block  ;; label = @18
                                        block  ;; label = @19
                                          block  ;; label = @20
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  block  ;; label = @24
                                                    local.get 4
                                                    i32.const 1
                                                    i32.sub
                                                    br_table 5 (;@19;) 0 (;@24;) 18 (;@6;) 2 (;@22;) 18 (;@6;) 1 (;@23;) 18 (;@6;) 4 (;@20;) 3 (;@21;)
                                                  end
                                                  local.get 2
                                                  i32.const 1036
                                                  i32.eq
                                                  br_if 18 (;@5;)
                                                  local.get 3
                                                  i32.const 99
                                                  i32.ne
                                                  br_if 13 (;@10;)
                                                  local.get 2
                                                  i32.load16_u offset=2
                                                  i32.const 97
                                                  i32.eq
                                                  br_if 6 (;@17;)
                                                  br 13 (;@10;)
                                                end
                                                local.get 2
                                                i32.const 1046
                                                i32.eq
                                                br_if 17 (;@5;)
                                                local.get 3
                                                i32.const 100
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=2
                                                i32.const 101
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=4
                                                i32.const 98
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=6
                                                i32.const 117
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=8
                                                i32.const 103
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=10
                                                i32.const 103
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=12
                                                i32.const 101
                                                i32.ne
                                                br_if 16 (;@6;)
                                                local.get 2
                                                i32.load16_u offset=14
                                                i32.const 114
                                                i32.ne
                                                br_if 16 (;@6;)
                                                br 17 (;@5;)
                                              end
                                              local.get 2
                                              i32.const 1064
                                              i32.eq
                                              br_if 16 (;@5;)
                                              local.get 3
                                              i32.const 100
                                              i32.ne
                                              br_if 9 (;@12;)
                                              local.get 2
                                              i32.load16_u offset=2
                                              i32.const 101
                                              i32.eq
                                              br_if 3 (;@18;)
                                              br 9 (;@12;)
                                            end
                                            local.get 2
                                            i32.const 1078
                                            i32.eq
                                            br_if 15 (;@5;)
                                            local.get 3
                                            i32.const 100
                                            i32.eq
                                            br_if 7 (;@13;)
                                            local.get 2
                                            i32.const 1094
                                            i32.eq
                                            br_if 15 (;@5;)
                                            local.get 3
                                            i32.const 105
                                            i32.ne
                                            br_if 14 (;@6;)
                                            local.get 2
                                            i32.load16_u offset=2
                                            i32.const 110
                                            i32.ne
                                            br_if 14 (;@6;)
                                            br 15 (;@5;)
                                          end
                                          local.get 2
                                          i32.const 1100
                                          i32.eq
                                          br_if 14 (;@5;)
                                          local.get 3
                                          i32.const 105
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=2
                                          i32.const 110
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=4
                                          i32.const 115
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=6
                                          i32.const 116
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=8
                                          i32.const 97
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=10
                                          i32.const 110
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=12
                                          i32.const 99
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=14
                                          i32.const 101
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=16
                                          i32.const 111
                                          i32.ne
                                          br_if 13 (;@6;)
                                          local.get 2
                                          i32.load16_u offset=18
                                          i32.const 102
                                          i32.ne
                                          br_if 13 (;@6;)
                                          br 14 (;@5;)
                                        end
                                        local.get 2
                                        i32.const 1122
                                        i32.eq
                                        br_if 13 (;@5;)
                                        local.get 3
                                        i32.const 110
                                        i32.ne
                                        br_if 12 (;@6;)
                                        local.get 2
                                        i32.load16_u offset=2
                                        i32.const 101
                                        i32.ne
                                        br_if 12 (;@6;)
                                        local.get 2
                                        i32.load16_u offset=4
                                        i32.const 119
                                        i32.eq
                                        br_if 13 (;@5;)
                                        br 12 (;@6;)
                                      end
                                      local.get 2
                                      i32.load16_u offset=4
                                      i32.const 108
                                      i32.ne
                                      br_if 5 (;@12;)
                                      local.get 2
                                      i32.load16_u offset=6
                                      i32.const 101
                                      i32.ne
                                      br_if 5 (;@12;)
                                      local.get 2
                                      i32.load16_u offset=8
                                      i32.const 116
                                      i32.ne
                                      br_if 5 (;@12;)
                                      local.get 2
                                      i32.load16_u offset=10
                                      i32.const 101
                                      i32.eq
                                      local.get 2
                                      i32.const 1130
                                      i32.eq
                                      i32.or
                                      br_if 12 (;@5;)
                                      local.get 2
                                      i32.const 1156
                                      i32.ne
                                      br_if 6 (;@11;)
                                      br 12 (;@5;)
                                    end
                                    local.get 2
                                    i32.load16_u offset=4
                                    i32.const 115
                                    i32.ne
                                    br_if 6 (;@10;)
                                    local.get 2
                                    i32.load16_u offset=6
                                    i32.const 101
                                    i32.eq
                                    local.get 2
                                    i32.const 1084
                                    i32.eq
                                    i32.or
                                    br_if 11 (;@5;)
                                    local.get 2
                                    i32.const 1170
                                    i32.ne
                                    br_if 7 (;@9;)
                                    br 11 (;@5;)
                                  end
                                  local.get 2
                                  i32.load16_u offset=4
                                  i32.const 97
                                  i32.ne
                                  br_if 7 (;@8;)
                                  local.get 2
                                  i32.load16_u offset=6
                                  i32.const 105
                                  i32.ne
                                  br_if 7 (;@8;)
                                  local.get 2
                                  i32.load16_u offset=8
                                  i32.const 116
                                  i32.eq
                                  local.get 2
                                  i32.const 1144
                                  i32.eq
                                  i32.or
                                  br_if 10 (;@5;)
                                  local.get 2
                                  i32.const 1180
                                  i32.ne
                                  br_if 8 (;@7;)
                                  br 10 (;@5;)
                                end
                                local.get 0
                                call 7
                                local.get 0
                                local.get 0
                                i32.load offset=16
                                local.get 5
                                i32.sub
                                i32.store offset=12
                                local.get 0
                                local.get 0
                                i32.load
                                local.get 7
                                i32.add
                                i32.store offset=8
                                i32.const 1
                                i32.eq
                                br_if 10 (;@4;)
                                loop  ;; label = @15
                                  local.get 0
                                  i32.const 1
                                  call 8
                                  local.get 0
                                  i32.load offset=16
                                  local.set 2
                                  local.get 0
                                  call 7
                                  local.get 0
                                  local.get 0
                                  i32.load offset=16
                                  local.get 2
                                  i32.sub
                                  i32.store offset=12
                                  local.get 0
                                  local.get 0
                                  i32.load
                                  local.get 2
                                  i32.const 1
                                  i32.shl
                                  i32.add
                                  i32.store offset=8
                                  i32.const 4
                                  i32.ne
                                  br_if 0 (;@15;)
                                end
                                br 10 (;@4;)
                              end
                              block  ;; label = @14
                                block  ;; label = @15
                                  block  ;; label = @16
                                    local.get 3
                                    i32.const 255
                                    i32.and
                                    i32.const -34
                                    i32.add
                                    local.tee 2
                                    i32.const 5
                                    i32.gt_u
                                    br_if 0 (;@16;)
                                    block  ;; label = @17
                                      local.get 2
                                      i32.const 1
                                      i32.sub
                                      br_table 1 (;@16;) 1 (;@16;) 1 (;@16;) 1 (;@16;) 0 (;@17;)
                                    end
                                    local.get 0
                                    local.get 5
                                    i32.const 1
                                    i32.add
                                    local.tee 3
                                    i32.store offset=16
                                    local.get 5
                                    local.set 6
                                    local.get 3
                                    local.get 11
                                    i32.ge_s
                                    br_if 1 (;@15;)
                                    loop  ;; label = @17
                                      local.get 4
                                      local.get 3
                                      i32.const 1
                                      i32.shl
                                      i32.add
                                      i32.load16_u
                                      local.tee 9
                                      local.get 10
                                      i32.eq
                                      br_if 3 (;@14;)
                                      local.get 3
                                      local.set 2
                                      local.get 9
                                      i32.const 92
                                      i32.eq
                                      if  ;; label = @18
                                        local.get 0
                                        local.get 6
                                        i32.const 2
                                        i32.add
                                        local.tee 2
                                        i32.store offset=16
                                      end
                                      local.get 0
                                      local.get 2
                                      i32.const 1
                                      i32.add
                                      local.tee 3
                                      i32.store offset=16
                                      local.get 2
                                      local.set 6
                                      local.get 3
                                      local.get 11
                                      i32.lt_s
                                      br_if 0 (;@17;)
                                    end
                                    br 1 (;@15;)
                                  end
                                  block (result i32)  ;; label = @16
                                    block  ;; label = @17
                                      block  ;; label = @18
                                        block  ;; label = @19
                                          block  ;; label = @20
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  block  ;; label = @24
                                                    local.get 10
                                                    i32.const -33
                                                    i32.add
                                                    local.tee 2
                                                    i32.const 7
                                                    i32.gt_u
                                                    if  ;; label = @25
                                                      local.get 10
                                                      i32.const 123
                                                      i32.ne
                                                      br_if 4 (;@21;)
                                                      local.get 0
                                                      local.get 5
                                                      i32.const 1
                                                      i32.add
                                                      i32.store offset=16
                                                      local.get 0
                                                      i32.load offset=12
                                                      local.get 0
                                                      i32.const 1
                                                      i32.store offset=12
                                                      local.get 0
                                                      i32.load offset=8
                                                      local.set 2
                                                      local.get 0
                                                      local.get 9
                                                      i32.store offset=8
                                                      local.get 0
                                                      i32.const 2
                                                      call 8
                                                      local.get 0
                                                      i32.const 1
                                                      i32.store offset=12
                                                      local.get 0
                                                      local.get 0
                                                      i32.load offset=16
                                                      local.tee 5
                                                      i32.const 1
                                                      i32.add
                                                      i32.store offset=16
                                                      local.get 0
                                                      local.get 0
                                                      i32.load
                                                      local.get 5
                                                      i32.const 1
                                                      i32.shl
                                                      i32.add
                                                      i32.store offset=8
                                                      local.get 0
                                                      call 6
                                                      local.get 0
                                                      i32.load align=1
                                                      local.get 0
                                                      i32.load offset=16
                                                      i32.const 1
                                                      i32.shl
                                                      i32.add
                                                      i32.load16_u
                                                      i32.const 47
                                                      i32.ne
                                                      br_if 21 (;@4;)
                                                      i32.const -1
                                                      i32.add
                                                      local.tee 3
                                                      i32.const 6
                                                      i32.gt_u
                                                      br_if 21 (;@4;)
                                                      local.get 3
                                                      i32.const 1
                                                      i32.sub
                                                      br_table 21 (;@4;) 21 (;@4;) 21 (;@4;) 21 (;@4;) 21 (;@4;) 2 (;@23;) 1 (;@24;)
                                                    end
                                                    block  ;; label = @25
                                                      local.get 2
                                                      i32.const 1
                                                      i32.sub
                                                      br_table 4 (;@21;) 4 (;@21;) 4 (;@21;) 5 (;@20;) 5 (;@20;) 4 (;@21;) 0 (;@25;) 5 (;@20;)
                                                    end
                                                    local.get 0
                                                    local.get 5
                                                    i32.const 1
                                                    i32.add
                                                    i32.store offset=16
                                                    local.get 0
                                                    i32.load offset=12
                                                    local.get 0
                                                    i32.const 1
                                                    i32.store offset=12
                                                    local.get 0
                                                    i32.load offset=8
                                                    local.set 2
                                                    local.get 0
                                                    local.get 9
                                                    i32.store offset=8
                                                    local.get 0
                                                    i32.const 3
                                                    call 8
                                                    local.get 0
                                                    i32.const 1
                                                    i32.store offset=12
                                                    local.get 0
                                                    local.get 0
                                                    i32.load offset=16
                                                    local.tee 5
                                                    i32.const 1
                                                    i32.add
                                                    i32.store offset=16
                                                    local.get 0
                                                    local.get 0
                                                    i32.load
                                                    local.get 5
                                                    i32.const 1
                                                    i32.shl
                                                    i32.add
                                                    i32.store offset=8
                                                    local.get 0
                                                    call 6
                                                    local.get 0
                                                    i32.load align=1
                                                    local.get 0
                                                    i32.load offset=16
                                                    i32.const 1
                                                    i32.shl
                                                    i32.add
                                                    i32.load16_u
                                                    i32.const 47
                                                    i32.ne
                                                    br_if 20 (;@4;)
                                                    i32.const -2
                                                    i32.add
                                                    local.tee 3
                                                    i32.const 3
                                                    i32.gt_u
                                                    br_if 20 (;@4;)
                                                    block  ;; label = @25
                                                      block  ;; label = @26
                                                        block  ;; label = @27
                                                          block  ;; label = @28
                                                            local.get 3
                                                            i32.const 1
                                                            i32.sub
                                                            br_table 1 (;@27;) 24 (;@4;) 2 (;@26;) 0 (;@28;)
                                                          end
                                                          local.get 2
                                                          i32.const 1772
                                                          i32.eq
                                                          br_if 2 (;@25;)
                                                          local.get 2
                                                          i32.load16_u
                                                          i32.const 105
                                                          i32.ne
                                                          br_if 23 (;@4;)
                                                          local.get 2
                                                          i32.load16_u offset=2
                                                          i32.const 102
                                                          i32.eq
                                                          br_if 2 (;@25;)
                                                          br 23 (;@4;)
                                                        end
                                                        local.get 2
                                                        i32.const 1778
                                                        i32.eq
                                                        br_if 1 (;@25;)
                                                        local.get 2
                                                        i32.load16_u
                                                        i32.const 102
                                                        i32.ne
                                                        br_if 22 (;@4;)
                                                        local.get 2
                                                        i32.load16_u offset=2
                                                        i32.const 111
                                                        i32.ne
                                                        br_if 22 (;@4;)
                                                        local.get 2
                                                        i32.load16_u offset=4
                                                        i32.const 114
                                                        i32.eq
                                                        br_if 1 (;@25;)
                                                        br 22 (;@4;)
                                                      end
                                                      local.get 2
                                                      i32.const 1786
                                                      i32.eq
                                                      br_if 0 (;@25;)
                                                      local.get 2
                                                      i32.load16_u
                                                      i32.const 119
                                                      i32.ne
                                                      br_if 21 (;@4;)
                                                      local.get 2
                                                      i32.load16_u offset=2
                                                      i32.const 104
                                                      i32.ne
                                                      br_if 21 (;@4;)
                                                      local.get 2
                                                      i32.load16_u offset=4
                                                      i32.const 105
                                                      i32.ne
                                                      br_if 21 (;@4;)
                                                      local.get 2
                                                      i32.load16_u offset=6
                                                      i32.const 108
                                                      i32.ne
                                                      br_if 21 (;@4;)
                                                      local.get 2
                                                      i32.load16_u offset=8
                                                      i32.const 101
                                                      i32.ne
                                                      br_if 21 (;@4;)
                                                    end
                                                    local.get 0
                                                    call 9
                                                    br 20 (;@4;)
                                                  end
                                                  local.get 2
                                                  i32.const 1748
                                                  i32.eq
                                                  local.get 2
                                                  i32.const 1752
                                                  i32.eq
                                                  i32.or
                                                  br_if 1 (;@22;)
                                                  local.get 2
                                                  i32.load16_u
                                                  i32.const -41
                                                  i32.add
                                                  local.tee 2
                                                  i32.const 18
                                                  i32.gt_u
                                                  br_if 19 (;@4;)
                                                  local.get 2
                                                  i32.const 1
                                                  i32.sub
                                                  br_table 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 19 (;@4;) 1 (;@22;)
                                                end
                                                local.get 2
                                                i32.const 1756
                                                i32.eq
                                                br_if 0 (;@22;)
                                                local.get 2
                                                i32.load16_u
                                                i32.const 102
                                                i32.ne
                                                br_if 18 (;@4;)
                                                local.get 2
                                                i32.load16_u offset=2
                                                i32.const 105
                                                i32.ne
                                                br_if 18 (;@4;)
                                                local.get 2
                                                i32.load16_u offset=4
                                                i32.const 110
                                                i32.ne
                                                br_if 18 (;@4;)
                                                local.get 2
                                                i32.load16_u offset=6
                                                i32.const 97
                                                i32.ne
                                                br_if 18 (;@4;)
                                                local.get 2
                                                i32.load16_u offset=8
                                                i32.const 108
                                                i32.ne
                                                br_if 18 (;@4;)
                                                local.get 2
                                                i32.load16_u offset=10
                                                i32.const 108
                                                i32.ne
                                                br_if 18 (;@4;)
                                                local.get 2
                                                i32.load16_u offset=12
                                                i32.const 121
                                                i32.ne
                                                br_if 18 (;@4;)
                                              end
                                              local.get 0
                                              call 9
                                              br 17 (;@4;)
                                            end
                                            local.get 3
                                            i32.const 65528
                                            i32.and
                                            i32.const 40
                                            i32.eq
                                            local.get 3
                                            i32.const -58
                                            i32.add
                                            i32.const 65535
                                            i32.and
                                            i32.const 6
                                            i32.lt_u
                                            i32.or
                                            br_if 0 (;@20;)
                                            local.get 3
                                            i32.const -123
                                            i32.add
                                            i32.const 65535
                                            i32.and
                                            i32.const 4
                                            i32.lt_u
                                            local.get 10
                                            i32.const -91
                                            i32.add
                                            local.tee 2
                                            i32.const 3
                                            i32.le_u
                                            i32.const 0
                                            local.get 2
                                            i32.const 1
                                            i32.ne
                                            select
                                            i32.or
                                            br_if 0 (;@20;)
                                            local.get 9
                                            i32.const 2
                                            i32.add
                                            local.tee 12
                                            local.set 6
                                            local.get 3
                                            local.set 4
                                            local.get 5
                                            local.set 2
                                            block  ;; label = @21
                                              loop  ;; label = @22
                                                local.get 4
                                                i32.const 65535
                                                i32.and
                                                local.tee 7
                                                i32.const -9
                                                i32.add
                                                local.tee 15
                                                i32.const 29
                                                i32.le_u
                                                i32.const 0
                                                i32.const 1
                                                local.get 15
                                                i32.shl
                                                i32.const 830472223
                                                i32.and
                                                select
                                                local.get 7
                                                i32.const 160
                                                i32.eq
                                                local.get 4
                                                i32.const 65528
                                                i32.and
                                                i32.const 40
                                                i32.eq
                                                i32.or
                                                i32.or
                                                local.get 4
                                                i32.const -58
                                                i32.add
                                                i32.const 65535
                                                i32.and
                                                i32.const 6
                                                i32.lt_u
                                                i32.or
                                                br_if 1 (;@21;)
                                                local.get 4
                                                i32.const -123
                                                i32.add
                                                i32.const 65535
                                                i32.and
                                                i32.const 4
                                                i32.lt_u
                                                local.get 7
                                                i32.const -91
                                                i32.add
                                                local.tee 7
                                                i32.const 3
                                                i32.le_u
                                                i32.const 0
                                                local.get 7
                                                i32.const 1
                                                i32.ne
                                                select
                                                i32.or
                                                br_if 1 (;@21;)
                                                local.get 0
                                                local.get 2
                                                i32.const 1
                                                i32.add
                                                local.tee 7
                                                i32.store offset=16
                                                local.get 7
                                                local.get 11
                                                i32.lt_s
                                                if  ;; label = @23
                                                  local.get 6
                                                  i32.load16_u
                                                  local.set 4
                                                  local.get 6
                                                  i32.const 2
                                                  i32.add
                                                  local.set 6
                                                  local.get 7
                                                  local.set 2
                                                  br 1 (;@22;)
                                                end
                                              end
                                              local.get 2
                                              i32.const 1
                                              i32.add
                                              local.set 2
                                            end
                                            local.get 0
                                            local.get 5
                                            i32.store offset=16
                                            local.get 2
                                            local.get 5
                                            i32.sub
                                            i32.const 6
                                            i32.ne
                                            br_if 3 (;@17;)
                                            block  ;; label = @21
                                              local.get 9
                                              i32.const 1410
                                              i32.eq
                                              br_if 0 (;@21;)
                                              local.get 10
                                              i32.const 105
                                              i32.ne
                                              br_if 4 (;@17;)
                                              i32.const 2
                                              local.set 4
                                              loop  ;; label = @22
                                                local.get 4
                                                i32.const 2
                                                i32.add
                                                local.tee 2
                                                i32.const 14
                                                i32.eq
                                                br_if 1 (;@21;)
                                                local.get 4
                                                local.get 9
                                                i32.add
                                                local.set 6
                                                local.get 4
                                                i32.const 1410
                                                i32.add
                                                local.get 2
                                                local.set 4
                                                i32.load16_u
                                                local.get 6
                                                i32.load16_u
                                                i32.eq
                                                br_if 0 (;@22;)
                                              end
                                              br 4 (;@17;)
                                            end
                                            local.get 0
                                            i32.load offset=12 align=1
                                            i32.const 1
                                            i32.eq
                                            if  ;; label = @21
                                              local.get 0
                                              i32.load offset=8 align=1
                                              local.tee 2
                                              i32.const 1424
                                              i32.eq
                                              br_if 4 (;@17;)
                                              local.get 5
                                              local.get 2
                                              i32.load16_u
                                              i32.const 46
                                              i32.eq
                                              br_if 5 (;@16;)
                                              drop
                                            end
                                            local.get 8
                                            i32.const 8
                                            i32.add
                                            local.get 0
                                            call 10
                                            local.get 0
                                            call 6
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                local.get 0
                                                i32.load align=1
                                                local.get 0
                                                i32.load offset=16
                                                local.tee 2
                                                i32.const 1
                                                i32.shl
                                                i32.add
                                                local.tee 3
                                                i32.load16_u
                                                local.tee 4
                                                i32.const -40
                                                i32.add
                                                local.tee 6
                                                i32.const 6
                                                i32.gt_u
                                                br_if 0 (;@22;)
                                                block  ;; label = @23
                                                  block  ;; label = @24
                                                    local.get 6
                                                    i32.const 1
                                                    i32.sub
                                                    br_table 2 (;@22;) 2 (;@22;) 2 (;@22;) 2 (;@22;) 2 (;@22;) 1 (;@23;) 0 (;@24;)
                                                  end
                                                  local.get 0
                                                  i32.const 1
                                                  i32.store offset=12
                                                  local.get 0
                                                  local.get 3
                                                  i32.store offset=8
                                                  local.get 0
                                                  local.get 2
                                                  i32.const 1
                                                  i32.add
                                                  local.tee 3
                                                  i32.store offset=16
                                                  local.get 0
                                                  call 6
                                                  local.get 0
                                                  i32.const 3
                                                  call 8
                                                  local.get 0
                                                  call 6
                                                  local.get 0
                                                  i32.const 1
                                                  i32.store offset=12
                                                  local.get 0
                                                  local.get 0
                                                  i32.load offset=16
                                                  local.tee 2
                                                  i32.const 1
                                                  i32.add
                                                  local.tee 4
                                                  i32.store offset=16
                                                  local.get 0
                                                  local.get 0
                                                  i32.load
                                                  local.get 2
                                                  i32.const 1
                                                  i32.shl
                                                  i32.add
                                                  i32.store offset=8
                                                  local.get 0
                                                  call 6
                                                  local.get 0
                                                  i32.load align=1
                                                  local.get 0
                                                  i32.load offset=16
                                                  i32.const 1
                                                  i32.shl
                                                  i32.add
                                                  i32.load16_u
                                                  i32.const 123
                                                  i32.eq
                                                  br_if 19 (;@4;)
                                                  local.get 5
                                                  local.get 4
                                                  local.get 3
                                                  local.get 2
                                                  call 3
                                                  br 19 (;@4;)
                                                end
                                                local.get 0
                                                i32.const 1
                                                i32.store offset=12
                                                local.get 0
                                                local.get 3
                                                i32.store offset=8
                                                local.get 0
                                                local.get 2
                                                i32.const 1
                                                i32.add
                                                i32.store offset=16
                                                local.get 0
                                                call 6
                                                local.get 8
                                                i32.const 8
                                                i32.add
                                                local.get 0
                                                call 10
                                                local.get 8
                                                i32.load offset=12
                                                i32.const 4
                                                i32.ne
                                                br_if 3 (;@19;)
                                                local.get 8
                                                i32.load offset=8
                                                local.tee 2
                                                i32.const 1498
                                                i32.eq
                                                br_if 4 (;@18;)
                                                local.get 2
                                                i32.load16_u
                                                i32.const 109
                                                i32.eq
                                                br_if 1 (;@21;)
                                                br 3 (;@19;)
                                              end
                                              block  ;; label = @22
                                                local.get 4
                                                i32.const 255
                                                i32.and
                                                i32.const -34
                                                i32.add
                                                local.tee 2
                                                i32.const 5
                                                i32.gt_u
                                                br_if 0 (;@22;)
                                                block  ;; label = @23
                                                  local.get 2
                                                  i32.const 1
                                                  i32.sub
                                                  br_table 1 (;@22;) 1 (;@22;) 1 (;@22;) 1 (;@22;) 0 (;@23;)
                                                end
                                                local.get 5
                                                call 5
                                                local.get 0
                                                local.get 0
                                                i32.load offset=16
                                                local.tee 7
                                                i32.const 1
                                                i32.add
                                                local.tee 3
                                                i32.store offset=16
                                                local.get 7
                                                i32.const 1
                                                i32.shl
                                                local.set 9
                                                block  ;; label = @23
                                                  local.get 3
                                                  local.get 0
                                                  i32.load offset=4
                                                  local.tee 10
                                                  i32.lt_s
                                                  if  ;; label = @24
                                                    local.get 0
                                                    i32.load align=1
                                                    local.tee 4
                                                    local.get 9
                                                    i32.add
                                                    i32.load16_u
                                                    local.set 11
                                                    local.get 7
                                                    local.set 6
                                                    loop  ;; label = @25
                                                      local.get 4
                                                      local.get 3
                                                      i32.const 1
                                                      i32.shl
                                                      i32.add
                                                      i32.load16_u
                                                      local.tee 12
                                                      local.get 11
                                                      i32.eq
                                                      br_if 2 (;@23;)
                                                      local.get 3
                                                      local.set 2
                                                      local.get 12
                                                      i32.const 92
                                                      i32.eq
                                                      if  ;; label = @26
                                                        local.get 0
                                                        local.get 6
                                                        i32.const 2
                                                        i32.add
                                                        local.tee 2
                                                        i32.store offset=16
                                                      end
                                                      local.get 0
                                                      local.get 2
                                                      i32.const 1
                                                      i32.add
                                                      local.tee 3
                                                      i32.store offset=16
                                                      local.get 2
                                                      local.set 6
                                                      local.get 3
                                                      local.get 10
                                                      i32.lt_s
                                                      br_if 0 (;@25;)
                                                    end
                                                  end
                                                  i32.const 1354
                                                  i32.const 27
                                                  call 0
                                                  local.get 0
                                                  i32.load
                                                  local.set 4
                                                  local.get 0
                                                  i32.load offset=16
                                                  local.set 3
                                                end
                                                local.get 0
                                                local.get 3
                                                i32.const 1
                                                i32.add
                                                local.tee 2
                                                local.get 7
                                                i32.sub
                                                i32.store offset=12
                                                local.get 0
                                                local.get 4
                                                local.get 9
                                                i32.add
                                                i32.store offset=8
                                                local.get 0
                                                local.get 2
                                                i32.store offset=16
                                                local.get 2
                                                local.get 0
                                                i64.load offset=8 align=4
                                                local.tee 16
                                                i32.wrap_i64
                                                local.get 16
                                                i64.const 32
                                                i64.shr_u
                                                i32.wrap_i64
                                                call 1
                                              end
                                              local.get 5
                                              call 5
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  local.get 0
                                                  i32.load align=1
                                                  local.get 0
                                                  i32.load offset=16
                                                  local.tee 2
                                                  i32.const 1
                                                  i32.shl
                                                  i32.add
                                                  local.tee 3
                                                  i32.load16_u
                                                  local.tee 5
                                                  i32.const 123
                                                  i32.eq
                                                  br_if 0 (;@23;)
                                                  local.get 5
                                                  i32.const 42
                                                  i32.eq
                                                  if  ;; label = @24
                                                    local.get 0
                                                    i32.const 1
                                                    i32.store offset=12
                                                    local.get 0
                                                    local.get 2
                                                    i32.const 2
                                                    i32.add
                                                    i32.store offset=16
                                                    local.get 0
                                                    local.get 3
                                                    i32.const 2
                                                    i32.add
                                                    i32.store offset=8
                                                    local.get 0
                                                    call 6
                                                    local.get 8
                                                    i32.const 8
                                                    i32.add
                                                    local.get 0
                                                    call 10
                                                    local.get 0
                                                    call 6
                                                    local.get 8
                                                    i32.const 8
                                                    i32.add
                                                    local.get 0
                                                    call 10
                                                    i32.const 1608
                                                    i32.const 1
                                                    local.get 8
                                                    i32.load offset=8
                                                    local.get 8
                                                    i32.load offset=12
                                                    call 2
                                                    br 2 (;@22;)
                                                  end
                                                  local.get 8
                                                  local.get 0
                                                  call 10
                                                  i32.const 1612
                                                  i32.const 7
                                                  local.get 8
                                                  i32.load
                                                  local.get 8
                                                  i32.load offset=4
                                                  call 2
                                                  local.get 0
                                                  call 6
                                                  local.get 0
                                                  i32.load align=1
                                                  local.get 0
                                                  i32.load offset=16
                                                  local.tee 2
                                                  i32.const 1
                                                  i32.shl
                                                  i32.add
                                                  local.tee 3
                                                  i32.load16_u
                                                  i32.const 44
                                                  i32.ne
                                                  br_if 1 (;@22;)
                                                  local.get 0
                                                  i32.const 1
                                                  i32.store offset=12
                                                  local.get 0
                                                  local.get 3
                                                  i32.store offset=8
                                                  local.get 0
                                                  local.get 2
                                                  i32.const 1
                                                  i32.add
                                                  i32.store offset=16
                                                  local.get 0
                                                  call 6
                                                  local.get 0
                                                  i32.load align=1
                                                  local.get 0
                                                  i32.load offset=16
                                                  local.tee 2
                                                  i32.const 1
                                                  i32.shl
                                                  i32.add
                                                  local.tee 3
                                                  i32.load16_u
                                                  local.tee 5
                                                  i32.const 123
                                                  i32.eq
                                                  br_if 0 (;@23;)
                                                  local.get 5
                                                  i32.const 42
                                                  i32.eq
                                                  if  ;; label = @24
                                                    local.get 0
                                                    i32.const 1
                                                    i32.store offset=12
                                                    local.get 0
                                                    local.get 2
                                                    i32.const 2
                                                    i32.add
                                                    i32.store offset=16
                                                    local.get 0
                                                    local.get 3
                                                    i32.const 2
                                                    i32.add
                                                    i32.store offset=8
                                                    local.get 0
                                                    call 6
                                                    local.get 8
                                                    i32.const 8
                                                    i32.add
                                                    local.get 0
                                                    call 10
                                                    local.get 0
                                                    call 6
                                                    local.get 8
                                                    i32.const 8
                                                    i32.add
                                                    local.get 0
                                                    call 10
                                                    i32.const 1608
                                                    i32.const 1
                                                    local.get 8
                                                    i32.load offset=8
                                                    local.get 8
                                                    i32.load offset=12
                                                    call 2
                                                    br 2 (;@22;)
                                                  end
                                                  i32.const 1628
                                                  i32.const 37
                                                  call 0
                                                  br 1 (;@22;)
                                                end
                                                local.get 0
                                                call 11
                                              end
                                              local.get 0
                                              call 6
                                              local.get 8
                                              local.get 0
                                              call 10
                                              local.get 0
                                              call 6
                                              local.get 0
                                              local.get 0
                                              i32.load offset=16
                                              local.tee 5
                                              i32.const 1
                                              i32.add
                                              local.tee 3
                                              i32.store offset=16
                                              local.get 5
                                              i32.const 1
                                              i32.shl
                                              local.set 7
                                              block  ;; label = @22
                                                local.get 3
                                                local.get 0
                                                i32.load offset=4
                                                local.tee 9
                                                i32.lt_s
                                                if  ;; label = @23
                                                  local.get 0
                                                  i32.load align=1
                                                  local.tee 6
                                                  local.get 7
                                                  i32.add
                                                  i32.load16_u
                                                  local.set 10
                                                  local.get 5
                                                  local.set 4
                                                  loop  ;; label = @24
                                                    local.get 6
                                                    local.get 3
                                                    i32.const 1
                                                    i32.shl
                                                    i32.add
                                                    i32.load16_u
                                                    local.tee 11
                                                    local.get 10
                                                    i32.eq
                                                    br_if 2 (;@22;)
                                                    local.get 3
                                                    local.set 2
                                                    local.get 11
                                                    i32.const 92
                                                    i32.eq
                                                    if  ;; label = @25
                                                      local.get 0
                                                      local.get 4
                                                      i32.const 2
                                                      i32.add
                                                      local.tee 2
                                                      i32.store offset=16
                                                    end
                                                    local.get 0
                                                    local.get 2
                                                    i32.const 1
                                                    i32.add
                                                    local.tee 3
                                                    i32.store offset=16
                                                    local.get 2
                                                    local.set 4
                                                    local.get 3
                                                    local.get 9
                                                    i32.lt_s
                                                    br_if 0 (;@24;)
                                                  end
                                                end
                                                i32.const 1354
                                                i32.const 27
                                                call 0
                                                local.get 0
                                                i32.load
                                                local.set 6
                                                local.get 0
                                                i32.load offset=16
                                                local.set 3
                                              end
                                              local.get 0
                                              local.get 3
                                              i32.const 1
                                              i32.add
                                              local.tee 2
                                              local.get 5
                                              i32.sub
                                              i32.store offset=12
                                              local.get 0
                                              local.get 6
                                              local.get 7
                                              i32.add
                                              i32.store offset=8
                                              local.get 0
                                              local.get 2
                                              i32.store offset=16
                                              local.get 2
                                              local.get 0
                                              i64.load offset=8 align=4
                                              local.tee 16
                                              i32.wrap_i64
                                              local.get 16
                                              i64.const 32
                                              i64.shr_u
                                              i32.wrap_i64
                                              call 1
                                              br 17 (;@4;)
                                            end
                                            local.get 2
                                            i32.load16_u offset=2
                                            i32.const 101
                                            i32.ne
                                            br_if 1 (;@19;)
                                            local.get 2
                                            i32.load16_u offset=4
                                            i32.const 116
                                            i32.ne
                                            br_if 1 (;@19;)
                                            local.get 2
                                            i32.load16_u offset=6
                                            i32.const 97
                                            i32.ne
                                            br_if 1 (;@19;)
                                            br 2 (;@18;)
                                          end
                                          local.get 0
                                          i32.const 1
                                          i32.store offset=12
                                          local.get 0
                                          local.get 9
                                          i32.store offset=8
                                          local.get 0
                                          local.get 5
                                          i32.const 1
                                          i32.add
                                          i32.store offset=16
                                          br 15 (;@4;)
                                        end
                                        i32.const 1508
                                        i32.const 49
                                        call 0
                                      end
                                      local.get 5
                                      local.get 0
                                      i32.load offset=16
                                      call 4
                                      br 13 (;@4;)
                                    end
                                    local.get 5
                                  end
                                  local.set 4
                                  block  ;; label = @16
                                    loop  ;; label = @17
                                      local.get 3
                                      i32.const 65535
                                      i32.and
                                      local.tee 2
                                      i32.const -9
                                      i32.add
                                      local.tee 6
                                      i32.const 29
                                      i32.le_u
                                      i32.const 0
                                      i32.const 1
                                      local.get 6
                                      i32.shl
                                      i32.const 830472223
                                      i32.and
                                      select
                                      local.get 2
                                      i32.const 160
                                      i32.eq
                                      local.get 3
                                      i32.const 65528
                                      i32.and
                                      i32.const 40
                                      i32.eq
                                      i32.or
                                      i32.or
                                      local.get 3
                                      i32.const -58
                                      i32.add
                                      i32.const 65535
                                      i32.and
                                      i32.const 6
                                      i32.lt_u
                                      i32.or
                                      br_if 1 (;@16;)
                                      local.get 3
                                      i32.const -123
                                      i32.add
                                      i32.const 65535
                                      i32.and
                                      i32.const 4
                                      i32.lt_u
                                      local.get 2
                                      i32.const -91
                                      i32.add
                                      local.tee 2
                                      i32.const 3
                                      i32.le_u
                                      i32.const 0
                                      local.get 2
                                      i32.const 1
                                      i32.ne
                                      select
                                      i32.or
                                      br_if 1 (;@16;)
                                      local.get 0
                                      local.get 4
                                      i32.const 1
                                      i32.add
                                      local.tee 2
                                      i32.store offset=16
                                      local.get 2
                                      local.get 11
                                      i32.lt_s
                                      if  ;; label = @18
                                        local.get 12
                                        i32.load16_u
                                        local.set 3
                                        local.get 12
                                        i32.const 2
                                        i32.add
                                        local.set 12
                                        local.get 2
                                        local.set 4
                                        br 1 (;@17;)
                                      end
                                    end
                                    local.get 4
                                    i32.const 1
                                    i32.add
                                    local.set 4
                                  end
                                  local.get 0
                                  local.get 5
                                  i32.store offset=16
                                  block  ;; label = @16
                                    block  ;; label = @17
                                      local.get 4
                                      local.get 5
                                      i32.sub
                                      i32.const 6
                                      i32.ne
                                      br_if 0 (;@17;)
                                      local.get 9
                                      i32.const 1428
                                      i32.eq
                                      br_if 1 (;@16;)
                                      local.get 10
                                      i32.const 101
                                      i32.ne
                                      br_if 0 (;@17;)
                                      i32.const 2
                                      local.set 3
                                      loop  ;; label = @18
                                        local.get 3
                                        i32.const 2
                                        i32.add
                                        local.tee 2
                                        i32.const 14
                                        i32.eq
                                        br_if 2 (;@16;)
                                        local.get 3
                                        local.get 9
                                        i32.add
                                        local.set 5
                                        local.get 3
                                        i32.const 1428
                                        i32.add
                                        local.get 2
                                        local.set 3
                                        i32.load16_u
                                        local.get 5
                                        i32.load16_u
                                        i32.eq
                                        br_if 0 (;@18;)
                                      end
                                    end
                                    local.get 8
                                    i32.const 8
                                    i32.add
                                    local.get 0
                                    call 10
                                    br 12 (;@4;)
                                  end
                                  local.get 8
                                  i32.const 8
                                  i32.add
                                  local.get 0
                                  call 10
                                  br 11 (;@4;)
                                end
                                i32.const 1354
                                i32.const 27
                                call 0
                                local.get 0
                                i32.load
                                local.set 4
                                local.get 0
                                i32.load offset=16
                                local.set 3
                              end
                              local.get 0
                              local.get 3
                              i32.const 1
                              i32.add
                              local.tee 2
                              i32.store offset=16
                              local.get 0
                              local.get 2
                              local.get 5
                              i32.sub
                              i32.store offset=12
                              local.get 0
                              local.get 4
                              local.get 7
                              i32.add
                              i32.store offset=8
                              br 9 (;@4;)
                            end
                            local.get 2
                            i32.load16_u offset=2
                            i32.const 111
                            i32.eq
                            br_if 7 (;@5;)
                            local.get 2
                            i32.const 1094
                            i32.ne
                            br_if 6 (;@6;)
                            br 7 (;@5;)
                          end
                          local.get 2
                          i32.const 1130
                          i32.eq
                          br_if 6 (;@5;)
                          block  ;; label = @12
                            local.get 3
                            i32.const 114
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 2
                            i32.load16_u offset=2
                            i32.const 101
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 2
                            i32.load16_u offset=4
                            i32.const 116
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 2
                            i32.load16_u offset=6
                            i32.const 117
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 2
                            i32.load16_u offset=8
                            i32.const 114
                            i32.ne
                            br_if 0 (;@12;)
                            local.get 2
                            i32.load16_u offset=10
                            i32.const 110
                            i32.eq
                            br_if 7 (;@5;)
                            local.get 2
                            i32.const 1156
                            i32.ne
                            br_if 6 (;@6;)
                            br 7 (;@5;)
                          end
                          local.get 2
                          i32.const 1156
                          i32.eq
                          br_if 6 (;@5;)
                        end
                        local.get 3
                        i32.const 116
                        i32.ne
                        br_if 4 (;@6;)
                        local.get 2
                        i32.load16_u offset=2
                        i32.const 121
                        i32.ne
                        br_if 4 (;@6;)
                        local.get 2
                        i32.load16_u offset=4
                        i32.const 112
                        i32.ne
                        br_if 4 (;@6;)
                        local.get 2
                        i32.load16_u offset=6
                        i32.const 101
                        i32.ne
                        br_if 4 (;@6;)
                        local.get 2
                        i32.load16_u offset=8
                        i32.const 111
                        i32.ne
                        br_if 4 (;@6;)
                        local.get 2
                        i32.load16_u offset=10
                        i32.const 102
                        i32.ne
                        br_if 4 (;@6;)
                        br 5 (;@5;)
                      end
                      local.get 2
                      i32.const 1084
                      i32.eq
                      br_if 4 (;@5;)
                      block  ;; label = @10
                        local.get 3
                        i32.const 101
                        i32.ne
                        br_if 0 (;@10;)
                        local.get 2
                        i32.load16_u offset=2
                        i32.const 108
                        i32.ne
                        br_if 0 (;@10;)
                        local.get 2
                        i32.load16_u offset=4
                        i32.const 115
                        i32.ne
                        br_if 0 (;@10;)
                        local.get 2
                        i32.load16_u offset=6
                        i32.const 101
                        i32.eq
                        br_if 5 (;@5;)
                        local.get 2
                        i32.const 1170
                        i32.ne
                        br_if 4 (;@6;)
                        br 5 (;@5;)
                      end
                      local.get 2
                      i32.const 1170
                      i32.eq
                      br_if 4 (;@5;)
                    end
                    local.get 3
                    i32.const 118
                    i32.ne
                    br_if 2 (;@6;)
                    local.get 2
                    i32.load16_u offset=2
                    i32.const 111
                    i32.ne
                    br_if 2 (;@6;)
                    local.get 2
                    i32.load16_u offset=4
                    i32.const 105
                    i32.ne
                    br_if 2 (;@6;)
                    local.get 2
                    i32.load16_u offset=6
                    i32.const 100
                    i32.ne
                    br_if 2 (;@6;)
                    br 3 (;@5;)
                  end
                  local.get 2
                  i32.const 1144
                  i32.eq
                  br_if 2 (;@5;)
                  block  ;; label = @8
                    local.get 3
                    i32.const 116
                    i32.ne
                    br_if 0 (;@8;)
                    local.get 2
                    i32.load16_u offset=2
                    i32.const 104
                    i32.ne
                    br_if 0 (;@8;)
                    local.get 2
                    i32.load16_u offset=4
                    i32.const 114
                    i32.ne
                    br_if 0 (;@8;)
                    local.get 2
                    i32.load16_u offset=6
                    i32.const 111
                    i32.ne
                    br_if 0 (;@8;)
                    local.get 2
                    i32.load16_u offset=8
                    i32.const 119
                    i32.eq
                    br_if 3 (;@5;)
                    local.get 2
                    i32.const 1180
                    i32.ne
                    br_if 1 (;@7;)
                    br 3 (;@5;)
                  end
                  local.get 2
                  i32.const 1180
                  i32.eq
                  br_if 2 (;@5;)
                end
                local.get 3
                i32.const 121
                i32.ne
                br_if 0 (;@6;)
                local.get 2
                i32.load16_u offset=2
                i32.const 105
                i32.ne
                br_if 0 (;@6;)
                local.get 2
                i32.load16_u offset=4
                i32.const 101
                i32.ne
                br_if 0 (;@6;)
                local.get 2
                i32.load16_u offset=6
                i32.const 108
                i32.ne
                br_if 0 (;@6;)
                local.get 2
                i32.load16_u offset=8
                i32.const 100
                i32.eq
                br_if 1 (;@5;)
              end
              local.get 0
              i32.const 1
              i32.store offset=12
              local.get 0
              local.get 9
              i32.store offset=8
              local.get 0
              local.get 5
              i32.const 1
              i32.add
              i32.store offset=16
              br 1 (;@4;)
            end
            local.get 0
            call 9
          end
          local.get 0
          call 6
          local.get 0
          i32.load offset=16
          local.tee 5
          local.get 0
          i32.load offset=4
          local.tee 11
          i32.lt_s
          br_if 0 (;@3;)
        end
      end
      local.get 1
      i32.eqz
      br_if 0 (;@1;)
      i32.const 1442
      i32.const 27
      call 0
    end
    local.get 8
    i32.const 16
    i32.add
    global.set 0)
  (func (;9;) (type 1) (param i32)
    (local i32 i32 i32 i32 i32 i32)
    local.get 0
    local.get 0
    i32.load offset=16
    local.tee 6
    i32.const 1
    i32.add
    local.tee 1
    i32.store offset=16
    block  ;; label = @1
      local.get 1
      local.get 0
      i32.load offset=4
      local.tee 3
      i32.lt_s
      if  ;; label = @2
        loop  ;; label = @3
          block  ;; label = @4
            local.get 0
            i32.load align=1
            local.tee 4
            local.get 1
            i32.const 1
            i32.shl
            i32.add
            i32.load16_u
            local.tee 5
            i32.const -91
            i32.add
            local.tee 2
            i32.const 1
            i32.gt_u
            if  ;; label = @5
              local.get 5
              i32.const 47
              i32.eq
              br_if 4 (;@1;)
              local.get 1
              local.set 2
              br 1 (;@4;)
            end
            block  ;; label = @5
              local.get 2
              i32.const 1
              i32.sub
              if  ;; label = @6
                local.get 0
                local.get 1
                i32.const 1
                i32.add
                local.tee 2
                i32.store offset=16
                local.get 2
                local.get 3
                i32.ge_s
                br_if 1 (;@5;)
                loop  ;; label = @7
                  block  ;; label = @8
                    local.get 4
                    local.get 2
                    i32.const 1
                    i32.shl
                    i32.add
                    i32.load16_u
                    i32.const -92
                    i32.add
                    local.tee 5
                    i32.const 1
                    i32.gt_u
                    if  ;; label = @9
                      local.get 2
                      local.set 1
                      br 1 (;@8;)
                    end
                    local.get 5
                    i32.const 1
                    i32.sub
                    i32.eqz
                    br_if 4 (;@4;)
                    local.get 0
                    local.get 1
                    i32.const 2
                    i32.add
                    local.tee 1
                    i32.store offset=16
                  end
                  local.get 0
                  local.get 1
                  i32.const 1
                  i32.add
                  local.tee 2
                  i32.store offset=16
                  local.get 2
                  local.get 3
                  i32.lt_s
                  br_if 0 (;@7;)
                end
                br 1 (;@5;)
              end
              local.get 0
              local.get 1
              i32.const 1
              i32.add
              local.tee 2
              i32.store offset=16
              br 1 (;@4;)
            end
            i32.const 1862
            i32.const 28
            call 0
            local.get 0
            i32.load offset=4
            local.set 3
            local.get 0
            i32.load offset=16
            local.set 2
          end
          local.get 0
          local.get 2
          i32.const 1
          i32.add
          local.tee 1
          i32.store offset=16
          local.get 1
          local.get 3
          i32.lt_s
          br_if 0 (;@3;)
        end
      end
      i32.const 1798
      i32.const 31
      call 0
      local.get 0
      i32.load
      local.set 4
      local.get 0
      i32.load offset=16
      local.set 1
    end
    local.get 0
    local.get 1
    i32.const 1
    i32.add
    local.tee 2
    i32.store offset=16
    local.get 0
    i32.const 12
    i32.add
    local.get 2
    local.get 6
    i32.sub
    i32.store
    local.get 0
    local.get 4
    local.get 6
    i32.const 1
    i32.shl
    i32.add
    i32.store offset=8)
  (func (;10;) (type 0) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32)
    block  ;; label = @1
      local.get 1
      i32.load offset=16
      local.tee 3
      local.get 1
      i32.load offset=4
      local.tee 7
      i32.ge_s
      if  ;; label = @2
        local.get 1
        i32.load
        local.set 8
        local.get 3
        local.set 2
        br 1 (;@1;)
      end
      local.get 1
      i32.load align=1
      local.tee 8
      local.get 3
      i32.const 1
      i32.shl
      i32.add
      local.set 5
      local.get 3
      local.set 2
      loop  ;; label = @2
        local.get 5
        i32.load16_u
        local.tee 4
        i32.const -9
        i32.add
        local.tee 6
        i32.const 29
        i32.le_u
        i32.const 0
        i32.const 1
        local.get 6
        i32.shl
        i32.const 830472223
        i32.and
        select
        local.get 4
        i32.const 160
        i32.eq
        local.get 4
        i32.const 65528
        i32.and
        i32.const 40
        i32.eq
        i32.or
        i32.or
        local.get 4
        i32.const -58
        i32.add
        i32.const 65535
        i32.and
        i32.const 6
        i32.lt_u
        i32.or
        br_if 1 (;@1;)
        local.get 4
        i32.const -123
        i32.add
        i32.const 65535
        i32.and
        i32.const 4
        i32.lt_u
        local.get 4
        i32.const -91
        i32.add
        local.tee 6
        i32.const 3
        i32.le_u
        i32.const 0
        local.get 6
        i32.const 1
        i32.ne
        select
        i32.or
        br_if 1 (;@1;)
        local.get 1
        local.get 2
        i32.const 1
        i32.add
        local.tee 2
        i32.store offset=16
        local.get 5
        i32.const 2
        i32.add
        local.set 5
        local.get 2
        local.get 7
        i32.ne
        br_if 0 (;@2;)
      end
      local.get 7
      local.set 2
    end
    local.get 1
    i32.const 12
    i32.add
    local.get 2
    local.get 3
    i32.sub
    i32.store
    local.get 1
    local.get 8
    local.get 3
    i32.const 1
    i32.shl
    i32.add
    i32.store offset=8
    local.get 0
    local.get 1
    i64.load offset=8 align=4
    i64.store align=4)
  (func (;11;) (type 1) (param i32)
    (local i32 i32 i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 2
    global.set 0
    local.get 0
    local.get 0
    i32.load offset=16
    i32.const 1
    i32.add
    local.tee 1
    i32.store offset=16
    block  ;; label = @1
      local.get 1
      local.get 0
      i32.load offset=4
      i32.lt_s
      if  ;; label = @2
        local.get 0
        i32.load align=1
        local.set 3
        loop  ;; label = @3
          local.get 3
          local.get 1
          i32.const 1
          i32.shl
          i32.add
          i32.load16_u
          i32.const 125
          i32.eq
          br_if 2 (;@1;)
          local.get 0
          call 6
          local.get 2
          i32.const 8
          i32.add
          local.get 0
          call 10
          local.get 0
          call 6
          block  ;; label = @4
            block  ;; label = @5
              local.get 0
              i32.load align=1
              local.get 0
              i32.load offset=16
              i32.const 1
              i32.shl
              i32.add
              i32.load16_u
              local.tee 1
              i32.const -33
              i32.add
              local.tee 3
              i32.const 5
              i32.le_u
              i32.const 0
              i32.const 1
              local.get 3
              i32.shl
              i32.const 49
              i32.and
              select
              local.get 1
              i32.const 65528
              i32.and
              i32.const 40
              i32.eq
              local.get 1
              i32.const -58
              i32.add
              i32.const 65535
              i32.and
              i32.const 6
              i32.lt_u
              i32.or
              i32.or
              br_if 0 (;@5;)
              local.get 1
              i32.const -123
              i32.add
              i32.const 65535
              i32.and
              i32.const 4
              i32.lt_u
              local.get 1
              i32.const -91
              i32.add
              local.tee 3
              i32.const 3
              i32.le_u
              i32.const 0
              local.get 3
              i32.const 1
              i32.ne
              select
              i32.or
              br_if 0 (;@5;)
              local.get 2
              local.get 0
              call 10
              local.get 0
              call 6
              local.get 2
              local.get 0
              call 10
              local.get 2
              i32.load offset=8
              local.get 2
              i32.load offset=12
              local.get 2
              i32.load
              local.get 2
              i32.load offset=4
              call 2
              br 1 (;@4;)
            end
            local.get 2
            i32.load offset=8
            local.tee 1
            local.get 2
            i32.load offset=12
            local.tee 3
            local.get 1
            local.get 3
            call 2
          end
          local.get 0
          call 6
          local.get 0
          i32.load align=1
          local.tee 3
          local.get 0
          i32.load offset=16
          local.tee 1
          i32.const 1
          i32.shl
          i32.add
          local.tee 4
          i32.load16_u
          i32.const 44
          i32.eq
          if  ;; label = @4
            local.get 0
            i32.const 1
            i32.store offset=12
            local.get 0
            local.get 4
            i32.store offset=8
            local.get 0
            local.get 1
            i32.const 1
            i32.add
            local.tee 1
            i32.store offset=16
          end
          local.get 1
          local.get 0
          i32.load offset=4
          i32.lt_s
          br_if 0 (;@3;)
        end
      end
      i32.const 1704
      i32.const 21
      call 0
      local.get 0
      i32.load
      local.set 3
      local.get 0
      i32.load offset=16
      local.set 1
    end
    local.get 0
    local.get 1
    i32.const 1
    i32.add
    i32.store offset=16
    local.get 0
    i32.const 12
    i32.add
    i32.const 1
    i32.store
    local.get 0
    local.get 3
    local.get 1
    i32.const 1
    i32.shl
    i32.add
    i32.store offset=8
    local.get 2
    i32.const 16
    i32.add
    global.set 0)
  (func (;12;) (type 0) (param i32 i32)
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
    i32.const 1920
    i32.store offset=16
    local.get 2
    local.get 1
    i32.store offset=12
    local.get 2
    local.get 0
    i32.store offset=8
    local.get 2
    i32.const 8
    i32.add
    i32.const 0
    call 8
    local.get 2
    i32.const 32
    i32.add
    global.set 0)
  (memory (;0;) 129)
  (global (;0;) (mut i32) (i32.const 8390544))
  (export "memory" (memory 0))
  (export "parse" (func 12))
  (data (;0;) (i32.const 1024) "a\00w\00a\00i\00t\00\00\00c\00a\00s\00e\00\00\00d\00e\00b\00u\00g\00g\00e\00r\00\00\00d\00e\00l\00e\00t\00e\00\00\00d\00o\00\00\00e\00l\00s\00e\00\00\00i\00n\00\00\00i\00n\00s\00t\00a\00n\00c\00e\00o\00f\00\00\00n\00e\00w\00\00\00r\00e\00t\00u\00r\00n\00\00\00t\00h\00r\00o\00w\00\00\00t\00y\00p\00e\00o\00f\00\00\00v\00o\00i\00d\00\00\00y\00i\00e\00l\00d\00\00\00/\00/\00\00\00/\00*\00\00\00F\00a\00i\00l\00e\00d\00 \00t\00o\00 \00c\00o\00n\00s\00u\00m\00e\00 \00b\00l\00o\00c\00k\00 \00c\00o\00m\00m\00e\00n\00t\00\00\00*\00/\00\00\00$\00{\00\00\00T\00e\00m\00p\00l\00a\00t\00e\00 \00l\00i\00t\00e\00r\00a\00l\00 \00r\00e\00a\00c\00h\00e\00d\00 \00e\00n\00d\00 \00o\00f\00 \00c\00o\00d\00e\00\00\00U\00n\00t\00e\00r\00m\00i\00n\00a\00t\00e\00d\00 \00s\00t\00r\00i\00n\00g\00 \00l\00i\00t\00e\00r\00a\00l\00\00\00i\00m\00p\00o\00r\00t\00\00\00.\00\00\00e\00x\00p\00o\00r\00t\00\00\00R\00e\00a\00c\00h\00e\00d\00 \00e\00n\00d\00 \00w\00i\00t\00h\00o\00u\00t\00 \00c\00l\00o\00s\00u\00r\00e\00\00\00m\00e\00t\00a\00\00\00i\00m\00p\00o\00r\00t\00.\00m\00e\00t\00a\00 \00i\00s\00 \00o\00n\00l\00y\00 \00i\00m\00p\00o\00r\00t\00 \00m\00e\00t\00a\00p\00r\00o\00p\00e\00r\00t\00y\00 \00s\00u\00p\00p\00o\00r\00t\00e\00d\00\00\00*\00\00\00d\00e\00f\00a\00u\00l\00t\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00t\00o\00k\00e\00n\00 \00a\00f\00t\00e\00r\00 \00d\00e\00f\00a\00u\00l\00t\00 \00i\00m\00p\00o\00r\00t\00\00\00U\00n\00c\00l\00o\00s\00e\00d\00 \00n\00a\00m\00e\00d\00 \00i\00m\00p\00o\00r\00t\00\00\00;\00\00\00)\00\00\00f\00i\00n\00a\00l\00l\00y\00\00\00i\00f\00\00\00f\00o\00r\00\00\00w\00h\00i\00l\00e\00\00\00U\00n\00t\00e\00r\00m\00i\00n\00a\00t\00e\00d\00 \00R\00e\00g\00u\00l\00a\00r\00 \00E\00x\00p\00r\00e\00s\00s\00i\00o\00n\00\00\00U\00n\00t\00e\00r\00m\00i\00n\00a\00t\00e\00d\00 \00C\00h\00a\00r\00a\00c\00t\00e\00r\00 \00C\00l\00a\00s\00s"))
