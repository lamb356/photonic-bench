# PhotonicBench Benchmark Card: Lightning 2023 photonic-electronic SmartNIC surrogate

Source-backed host/network-attached card for the SIGCOMM 2023 Lightning SmartNIC. The paper demonstrates a photonic-electronic inference datapath connected to a 100 Gbps NIC and local DDR; this config uses a LeNet-style 784x300 matvec surrogate under the pcie_attached scenario for PhotonicBench comparison only.

## Provenance

| Field | Value |
| --- | --- |
| Source | Lightning: A reconfigurable photonic-electronic SmartNIC for fast and energy-efficient inference |
| URL | https://dl.acm.org/doi/10.1145/3603269.3604821 |
| DOI | 10.1145/3603269.3604821 |
| Venue | ACM SIGCOMM 2023 |
| Claim status | paper-reported SmartNIC prototype and large-DNN simulation metrics; host/network-attached matvec surrogate |


## Published Calibration

These rows are paper-reported targets and direct unit conversions from those targets. They are not an independent device-level reproduction.

| Metric | Value |
| --- | ---: |
| Architecture | Reconfigurable photonic-electronic SmartNIC datapath |
| Realtime network rate gbps | 100 |
| Prototype frequency ghz | 4.055 |
| Mac accuracy percent | 99.25 |
| Mnist accuracy percent | 96.2 |
| Top5 accuracy delta vs digital percent | 2.25 |
| Serve time speedup vs nvidia a100 x | 337 |
| Serve time speedup vs a100x dpu x | 329 |
| Serve time speedup vs brainwave smartnic x | 42 |
| Energy reduction vs nvidia a100 x | 352 |
| Energy reduction vs a100x dpu x | 419 |
| Energy reduction vs brainwave smartnic x | 54 |
| Ddr data rate gbps | 170 |
| Cmac input rate gbps | 100 |
| Aggregate weight dac data rate gbps | 64.88 |
| Surrogate mapping | m=1, k=784, n=300 mirrors the paper's LeNet-300-100 first-layer example; it is not the full packet DAG, RFSoC datapath, DDR controller, or large-model simulation. |


## Source Quality Index

These rows summarize source evidence coverage for this published reference card. They do not turn local surrogate estimates into paper measurements.

| Field | Value |
| --- | --- |
| Reported metric types | network_rate, prototype_frequency, accuracy, relative_latency_reduction, relative_energy_reduction, memory_data_rate |
| Local surrogate type | host_network_attached_lenet_matvec_surrogate |
| Confidence grade | B |

| Dimension | Coverage |
| --- | --- |
| Throughput | reported |
| Energy | reported |
| Accuracy | reported |
| Area | reported |
| Precision | reported |

Source-quality notes:

- Source reports prototype frequency, NIC rate, accuracy, relative serve-time/energy results, and DDR datapath rates; PhotonicBench uses a single local matvec to stress host-attached movement.


## Source Audit

These rows keep quoted source metrics, direct conversion math, local assumptions,
and confidence flags separate. They do not turn local surrogate estimates into
paper measurements.

| Metric | Quoted value | Source location | Note |
| --- | --- | --- | --- |
| Real-time inference network rate | 100 Gbps | MIT Lightning project page and SIGCOMM 2023 paper |  |
| Prototype photonic computation frequency | 4.055 GHz | SIGCOMM 2023 paper abstract and Section 6.1 |  |
| Average inference serve-time speedup | 337x vs Nvidia A100, 329x vs A100X DPU, 42x vs Brainwave SmartNIC | SIGCOMM 2023 paper abstract |  |
| Average inference energy reduction | 352x vs Nvidia A100, 419x vs A100X DPU, 54x vs Brainwave SmartNIC | SIGCOMM 2023 paper abstract |  |
| DDR datapath rate | approximately 170 Gbps | SIGCOMM 2023 paper Section 6.1 |  |
| Architecture | Reconfigurable photonic-electronic SmartNIC datapath | published_calibration.architecture | Config-level source metric copied into the structured audit; exact paper section may be supplied in YAML source_audit.quoted_metrics. |
| Realtime network rate gbps | 100 | published_calibration.additional_metrics.realtime_network_rate_gbps | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Prototype frequency ghz | 4.055 | published_calibration.additional_metrics.prototype_frequency_ghz | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mac accuracy percent | 99.25 | published_calibration.additional_metrics.mac_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Mnist accuracy percent | 96.2 | published_calibration.additional_metrics.mnist_accuracy_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Top5 accuracy delta vs digital percent | 2.25 | published_calibration.additional_metrics.top5_accuracy_delta_vs_digital_percent | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Serve time speedup vs nvidia a100 x | 337 | published_calibration.additional_metrics.serve_time_speedup_vs_nvidia_a100_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Serve time speedup vs a100x dpu x | 329 | published_calibration.additional_metrics.serve_time_speedup_vs_a100x_dpu_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Serve time speedup vs brainwave smartnic x | 42 | published_calibration.additional_metrics.serve_time_speedup_vs_brainwave_smartnic_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Energy reduction vs nvidia a100 x | 352 | published_calibration.additional_metrics.energy_reduction_vs_nvidia_a100_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Energy reduction vs a100x dpu x | 419 | published_calibration.additional_metrics.energy_reduction_vs_a100x_dpu_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Energy reduction vs brainwave smartnic x | 54 | published_calibration.additional_metrics.energy_reduction_vs_brainwave_smartnic_x | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Ddr data rate gbps | 170 | published_calibration.additional_metrics.ddr_data_rate_gbps | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Cmac input rate gbps | 100 | published_calibration.additional_metrics.cmac_input_rate_gbps | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Aggregate weight dac data rate gbps | 64.88 | published_calibration.additional_metrics.aggregate_weight_dac_data_rate_gbps | Source-specific metric or surrogate boundary metadata provided by the card YAML. |
| Surrogate mapping | m=1, k=784, n=300 mirrors the paper's LeNet-300-100 first-layer example; it is not the full packet DAG, RFSoC datapath, DDR controller, or large-model simulation. | published_calibration.additional_metrics.surrogate_mapping | Source-specific metric or surrogate boundary metadata provided by the card YAML. |

| Derived metric | Formula | Inputs | Result | Note |
| --- | --- | --- | ---: | --- |


Local assumptions:

- Local 784x300 matvec mirrors a paper example layer only; the SmartNIC packet DAG and full inference serving system are not reproduced.
- The pcie_attached scenario is used to stress host/network-attached movement even though the paper avoids punting inference packets through host PCIe.
- Local surrogate type: host_network_attached_lenet_matvec_surrogate.
- Source reports prototype frequency, NIC rate, accuracy, relative serve-time/energy results, and DDR datapath rates; PhotonicBench uses a single local matvec to stress host-attached movement.
- Source network-rate, frequency, accuracy, DDR-rate, and relative speed/energy values remain under published_calibration and published_reference.
- The local pcie_attached profile intentionally penalizes host-attached movement for review sensitivity; it is not a cycle-accurate Lightning datapath model.
- Local optical MAC energy, converter energy, one-nanosecond latency, and movement pJ/byte are generic PhotonicBench assumptions.

Confidence flags:

- prototype_plus_simulation_metrics
- host_link_scenario_is_local_stress_case
- claim_status=paper-reported SmartNIC prototype and large-DNN simulation metrics; host/network-attached matvec surrogate
- source_doi=10.1145/3603269.3604821
- source_quality_grade=B
- coverage.accuracy=reported
- coverage.area=reported
- coverage.energy=reported
- coverage.precision=reported
- coverage.throughput=reported

Boundary note: Quoted metrics are source-reported values or source-adjacent card metadata. Conversion math is a direct unit conversion from published_calibration fields. Local assumptions remain separate PhotonicBench surrogate/model inputs.



## Workload

| Metric | Value |
| --- | ---: |
| Type | matmul |
| Shape | 1 x 784 times 784 x 300 |
| Operations per batch | 1 |
| MACs per operation | 235200 |
| MACs | 235200 |
| Equivalent ops per operation | 470400 |
| Equivalent ops | 470400 |
| Output elements per operation | 300 |
| Output elements | 300 |
| Vector DAC conversions | 784 |
| Weight DAC conversions | 235200 |
| DAC conversions | 235984 |
| ADC conversions | 300 |

## Execution Model

| Metric | Value |
| --- | ---: |
| Batch size | 1 |
| Vector reuse factor | 1 |
| Weight reuse factor | 1 |
| Weight stationary | False |
| Pipeline stages | 1 |
| Pipeline cycle time | 1.000 ns |

## Interface Memory Traffic

These rows estimate operand reads and output writes at the converter interface
from DAC/ADC bit widths and reuse counts. They are not a full memory hierarchy
simulation.

| Metric | Value |
| --- | ---: |
| Vector operand reads | 784 bytes |
| Weight operand reads | 235200 bytes |
| Output writes | 300 bytes |
| Total interface traffic | 236284 bytes |
| MACs per interface byte | 0.995412 |
| Equivalent ops per interface byte | 1.99082 |

## Multi-Tier System Movement

These rows add an explicit local system movement estimate on top of the
photonic core/converter model. SRAM, intermediate, and off-chip traffic are
cumulative tier movements, not published measurements and not a cache
simulator.

| Tier | Read bytes | Write bytes | Movement energy | Traffic share | Movement share | System share | Transfer time | Guardbanded transfer | Tier pressure | Effective bandwidth | Required bandwidth | Utilization | Headroom |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| SRAM | 235984 bytes | 300 bytes | 4725.680 pJ | 33.33% | 0.04% | 0.04% | 230.746 ns | 570.079 ns | 570.079 | 435.200 bytes/ns | 236284.000 bytes/ns | 542.932 | -235848.800 bytes/ns |
| Intermediate/cache | 235984 bytes | 300 bytes | 47256.800 pJ | 33.33% | 0.40% | 0.40% | 1845.969 ns | 4560.629 ns | 4560.63 | 54.400 bytes/ns | 236284.000 bytes/ns | 4343.46 | -236229.600 bytes/ns |
| Off-chip/DRAM | 235984 bytes | 300 bytes | 11814200.000 pJ | 33.33% | 99.56% | 99.16% | 29535.500 ns | 72970.059 ns | 72970.1 | 3.400 bytes/ns | 236284.000 bytes/ns | 69495.3 | -236280.600 bytes/ns |

### Hierarchy Energy Breakdown

This table is a local system-energy decomposition by hierarchy level. It is
not a published hardware energy breakdown.

| Component | Energy | System share |
| --- | ---: | ---: |
| Local compute/conversion | 47820.200 pJ | 0.40% |
| SRAM movement | 4725.680 pJ | 0.04% |
| Intermediate/cache movement | 47256.800 pJ | 0.40% |
| Off-chip/DRAM movement | 11814200.000 pJ | 99.16% |
| Total movement | 11866182.480 pJ | 99.60% |

| Metric | Value |
| --- | ---: |
| System profile | pcie_attached |
| Profile tier overrides | none |
| Memory scenario | pcie_attached |
| Scenario description | Local SRAM plus a host/PCIe-attached memory path with lower effective bandwidth and higher movement energy. |
| Memory timing mode | serialized |
| Contention preset | pcie_round_robin |
| Contention preset description | Host/PCIe-attached path: two clients share a serialized host link with round-robin arbitration and explicit protocol guardband. |
| Contention overlap model | serialized_host_link |
| Shared bandwidth clients | 2 |
| Arbitration efficiency | 0.85 |
| Calibration/control overhead | 0.05 |
| Local compute/conversion energy | 47820.200 pJ |
| Total movement energy | 11866182.480 pJ |
| Total system energy | 11914002.680 pJ |
| System energy per MAC | 50.655 pJ |
| System energy per equivalent op | 25.327 pJ |
| Local compute/conversion energy share | 0.40% |
| Movement energy share | 99.60% |
| Movement-to-compute energy ratio | 248.142 |
| Total hierarchy traffic | 708852 bytes |
| Hierarchy equivalent ops per byte | 0.663608 |
| Movement energy per hierarchy byte | 16.740 pJ |
| SRAM traffic share | 33.33% |
| Intermediate/cache traffic share | 33.33% |
| Off-chip traffic share | 33.33% |
| Dominant traffic tier | sram |
| Dominant system energy component | off_chip |
| Dominant movement-energy tier | off_chip |
| Nominal memory bottleneck tier | off_chip |
| Contention memory bottleneck tier | off_chip |
| Max tier nominal pressure ratio | 29535.5 |
| Max tier contention pressure ratio | 72970.1 |
| Max tier movement-energy share | 99.56% |
| Max tier system energy share | 99.16% |
| Contention bandwidth saturation tier | off_chip |
| Max tier contention bandwidth utilization | 69495.3 |
| Min tier contention bandwidth headroom ratio | 1.43895e-05 |
| Max transfer time | 29535.500 ns |
| Serialized transfer time | 31612.215 ns |
| Effective transfer time | 31612.215 ns |
| Contention bandwidth derate | 0.425 |
| Contention-adjusted effective transfer | 74381.682 ns |
| Calibration-adjusted effective transfer | 78100.766 ns |
| Calibration guardband time | 3719.084 ns |
| Contention transfer overhead | 135.29% |
| Total transfer overhead | 147.06% |
| Effective loaded hierarchy bandwidth | 22.423 bytes/ns |
| Contention-only loaded hierarchy bandwidth | 9.530 bytes/ns |
| Contention-adjusted loaded hierarchy bandwidth | 9.076 bytes/ns |
| Effective usable bandwidth under load | 9.530 bytes/ns |
| Guardbanded usable bandwidth under load | 9.076 bytes/ns |
| Transfer-to-compute time ratio | 31612.2 |
| Bandwidth-limited tier | serialized_tier_path |
| Bandwidth-limited batch latency | 31612.215 ns |
| Bandwidth pressure ratio | 31612.2 |
| Bandwidth-limited equivalent ops/s | 14880324024.275 |
| Contention-limited tier | serialized_tier_path |
| Contention-adjusted batch latency | 78100.766 ns |
| Contention-adjusted transfer-to-compute time ratio | 78100.8 |
| Contention pressure ratio | 78100.8 |
| Contention-adjusted equivalent ops/s | 6022988295.540 |

### Scenario Provenance Packs

These packs justify the selected local memory hierarchy and contention preset
without implying measured end-to-end hardware behavior.

| Pack | Status | Calibration scope | Sources | Local assumptions | Reviewer note |
| --- | --- | --- | --- | --- | --- |
| Memory scenario | source-context-plus-local-parameters | Serialized host/PCIe-attached path for cards whose data movement leaves the local accelerator package. | PCI-SIG PCI Express 6.0 specification overview (PCIe 6.0 specification overview); Lightning: A reconfigurable photonic-electronic SmartNIC for fast and energy-efficient inference (10.1145/3603269.3604821) | Host-link bandwidth and 50 pJ/byte movement are conservative local parameters.; The serialized timing mode is a local review guardrail for host-attached designs. | The pack makes host-link exposure visible without claiming a full PCIe protocol simulation. |
| Contention preset | source-context-plus-local-parameters | Serialized host-link contention with a local round-robin sharing and protocol guardband model. | PCI-SIG PCI Express 6.0 specification overview (PCIe 6.0 specification overview); Lightning: A reconfigurable photonic-electronic SmartNIC for fast and energy-efficient inference (10.1145/3603269.3604821) | Two modeled clients, 0.85 arbitration efficiency, and 0.05 guardband are local host-link review parameters. | Use to catch host-attached designs whose ranking depends on assuming free host movement. |


## Energy

| Metric | Value |
| --- | ---: |
| Optical compute delivered | 117.600 pJ |
| Laser electrical energy | 470.400 pJ |
| Detector energy | 3.000 pJ |
| ADC energy | 150.000 pJ |
| Vector DAC energy | 156.800 pJ |
| Weight DAC energy | 47040.000 pJ |
| DAC energy | 47196.800 pJ |
| Total energy | 47820.200 pJ |
| Energy per MAC | 0.203 pJ |
| Energy per equivalent op | 0.102 pJ |
| Peripheral share | 99.02% |

## Timing

| Metric | Value |
| --- | ---: |
| Optical latency | 1.000 ns |
| ADC latency | 0.000 ns |
| DAC latency | 0.000 ns |
| Total latency | 1.000 ns |
| Pipeline cycle time | 1.000 ns |
| Batch latency | 1.000 ns |
| Steady-state operations/s | 1000000000.000 |
| Steady-state equivalent ops/s | 470400000000000.000 |

## Noise

| Metric | Value |
| --- | ---: |
| ADC quantization SNR | 49.92 dB |
| ADC quantization RMS | 0.001132 |
| Phase noise RMS | 0.020000 rad |
| Drift RMS during integration | 0.000000000100 rad |
| Estimated relative error RMS | 2.0032% |

## Assumptions

- The optical MAC energy is treated as delivered optical energy per multiply-accumulate.
- The laser wall-plug efficiency converts delivered optical energy into electrical laser energy.
- ADC conversions are counted once per output element.
- DAC conversions are counted once per input value for the left and right matmul operands.
- Detector energy is counted once per output sample.
- The first noise model combines ADC quantization RMS, phase noise RMS, and drift RMS as independent terms.
- Total latency is a transparent sum of DAC, optical, and ADC latency rather than a pipelined throughput model.
- Source network-rate, frequency, accuracy, DDR-rate, and relative speed/energy values remain under published_calibration and published_reference.
- The local pcie_attached profile intentionally penalizes host-attached movement for review sensitivity; it is not a cycle-accurate Lightning datapath model.
- Local optical MAC energy, converter energy, one-nanosecond latency, and movement pJ/byte are generic PhotonicBench assumptions.
- The benchmark models 1 operation(s) per batch.
- Vector DAC conversions are counted as ceil(batch_size / vector_reuse_factor) * m * k.
- Weight DAC conversions are counted every 1 operation(s).
- The pipeline model reports single-operation latency, total batch latency including fill/drain, and steady-state throughput from the configured cycle time.
- Interface memory traffic is estimated from vector/weight DAC load counts, ADC output sample counts, and converter bit widths; it is not a full memory hierarchy simulation.
- The multi-tier system model adds explicit SRAM, intermediate/cache, and off-chip movement energy/timing estimates to the local photonic core/converter energy; tier values are local assumptions, not published measurements.
- System contention fields model shared bandwidth clients, arbitration efficiency, and calibration/control guardband as local assumptions; they are not inferred from published hardware unless a card says so.
- Memory scenario and contention preset names describe local review assumptions, including the overlap model used to interpret transfer timing; they are not benchmark claims.
