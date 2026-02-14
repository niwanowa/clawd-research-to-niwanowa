---
layout: default
title: "Linux tcコマンド (Traffic Control) 详解"
parent: Research
date: 2026-02-14
---

# Linux tcコマンド (Traffic Control) 详解

**調査日:** 2026-02-14
**調査タイプ:** Research (深掘り調査)
**対象:** Linux tcコマンド (Traffic Control)

---

## 📋 調査目的

Linuxの`tc`コマンド（Traffic Control）の基本概念、機能、使用方法について理解を深める。ネットワーク帯域制御やQoS（Quality of Service）の実装方法を把握する。

---

## 🔍 調査結果

### 基本情報
- **名称:** tc (Traffic Control)
- **公式ドキュメント:** [man7.org - tc(8)](https://man7.org/linux/man-pages/man8/tc.8.html)
- **リポジトリ:** iproute2 (Linux network utilities)

### 特徴・概要

**tcコマンド**は、Linuxカーネルでトラフィック制御（Traffic Control）を設定・操作するためのコマンドラインツール。ネットワーク帯域の制御、優先度付け、パケットのスケジューリングなどが可能。

**主な機能:**
1. **Shaping（シェイピング）:** 送信レートを制御し、帯域を制限する。バーストトラフィックを平滑化し、ネットワークの挙動を改善する。
2. **Scheduling（スケジューリング）:** パケットの送信順序を制御し、対話型トラフィックの優先度を上げながら、バルク転送にも帯域を保証する。
3. **Policing（ポリシング）:** 受信トラフィックのレートを監視・制限する（ingressで実行）。
4. **Dropping（ドロップ）:** 設定した帯域を超過したトラフィックを即座に破棄する。

### 詳細

#### トラフィック制御の3つの主要オブジェクト

**1. Qdisc (Queueing Discipline)**
- インターフェースに送信されるパケットをキューイング・管理するオブジェクト
- カーネルがパケットをネットワークインターフェースに送信する際、qdiscにエンキューされる
- 例: `pfifo`（単純なFIFOキュー）, `fq_codel`（公平キューシステム）

**2. Class（クラス）**
- classful qdisc内でトラフィックを分類するためのコンテナ
- 各クラスにはqdiscを含めることができ、トラフィックを優先度ごとに管理可能
- 例: `htb`（Hierarchical Token Bucket）クラスを使用して帯域を階層的に割り当て

**3. Filter（フィルタ）**
- classful qdiscで、パケットがどのクラスにエンキューされるかを決定する分類ルール
- パケットの内容（IPアドレス、ポート、プロトコルなど）に基づいて分類
- 例: `u32`（汎用フィルタ）, `bpf`（eBPFベースのフィルタ）

#### Classless Qdiscs（クラスレスQdisc）

主なclassless qdisc:

| Qdisc | 説明 |
|-------|------|
| **pfifo / bfifo** | 最も単純なFIFOキュー。パケット数またはバイト数で制限 |
| **fq_codel** | Fair Queuing + CoDel AQM。複数フローに公平な帯域を提供し、遅延を最小化 |
| **codel** | 適応型AQM（Active Queue Management）アルゴリズム。遅延を制御 |
| **netem** | Network Emulator。遅延、パケットロス、重複などをシミュレート |
| **ingress** | 受信トラフィック専用の特殊なqdisc。フィルタリングとポリシングに使用 |
| **mqprio** | マルチキュー優先度qdisc。ハードウェアキューへのマッピング |

#### 主なFilterタイプ

| Filter | 説明 |
|--------|------|
| **u32** | 汎用フィルタ。パケットの任意のデータに基づいてフィルタリング |
| **bpf** | eBPFを使用してフィルタリング。高度な条件指定が可能 |
| **flower** | フローベースの分類器。フロー識別子に基づいてフィルタリング |
| **cgroup** | プロセスのcgroupに基づいてフィルタリング |
| **route** | ルーティングテーブルに基づいてフィルタリング |

#### コマンド例

**基本構文:**
```bash
tc [OPTIONS] qdisc [ add | change | replace | delete ] dev DEV [ parent qdisc-id | root ] [ handle qdisc-id ] qdisc [qdisc-specific-parameters]
```

**qdiscの追加（rootとして）:**
```bash
tc qdisc add dev eth0 root handle 1: htb default 10
```

**クラスの追加:**
```bash
tc class add dev eth0 parent 1: classid 1:1 htb rate 1gbit ceil 1gbit
```

**フィルタの追加:**
```bash
tc filter add dev eth0 protocol ip parent 1:0 prio 1 u32 match ip dport 80 0xffff flowid 1:10
```

**qdiscの表示:**
```bash
tc qdisc show dev eth0
```

---

## ✅ メリット / ❌ デメリット

| メリット | デメリット |
|----------|------------|
| 帯域制御とQoSの柔軟な実装が可能 | 設定が複雑で習得に時間がかかる |
| カーネルレベルでの効率的なトラフィック制御 | 複雑な設定であればスクリプトが必要 |
| ネットワークエミュレーション（遅延、ロスなど）が可能 | 誤設定するとネットワーク通信に影響 |
| 複数のqdiscやフィルタを組み合わせ可能 | デバッグが難しい場合がある |

---

## 🆚 類似技術との比較

| 項目 | tc (Linux) | iptables/tc filters | Wondershaper |
|------|------------|---------------------|--------------|
| 帯域制御 | ✅ 高度 | ✅ 可能（限定的） | ✅ 簡易 |
| 遅延制御 | ✅ 可能 | ❌ 不可 | ❌ 不可 |
| 優先度付け | ✅ 可能 | ✅ 可能 | ❌ 不可 |
| 設定の簡易性 | ❌ 複雑 | △ 中間 | ✅ 簡単 |
| 柔軟性 | ✅ 高い | △ 中間 | ❌ 低い |

---

## 📝 結論・推奨

**tcコマンド**は、Linuxカーネルレベルで高度なトラフィック制御を実現する強力なツール。

**推奨される使用ケース:**
- 特定のアプリケーションやトラフィックタイプに対する帯域制限
- QoS（Quality of Service）の実装（VoIP、ストリーミングなどの優先制御）
- ネットワークテスト環境でのエミュレーション（遅延、パケットロスのシミュレーション）
- 複雑なネットワーク環境でのトラフィック分類と管理

**注意点:**
- 設定ミスはネットワーク通信に影響を与える可能性があるため、慎重に行う必要がある
- テスト環境での動作確認を推奨
- 複雑な設定はtcngなどのツールを使用すると管理が容易になる

---

## 📎 参考リンク（一次ソース）

- [tc(8) - Linux manual page](https://man7.org/linux/man-pages/man8/tc.8.html)
- [Introduction to Linux Traffic Control (TLDP)](https://tldp.org/HOWTO/Traffic-Control-HOWTO/intro.html)
- [iproute2 - GitHub](https://git.kernel.org/pub/scm/network/iproute2/iproute2.git/)
