import { useState, useEffect, useRef } from "react";

const INITIAL_DB=[{"id": 1, "partNo": "54530-S1000", "name": "B/JOINT-ASS'Y", "category": "ARM", "tag": "B/JOINT", "w": 145.0, "d": 72.0, "h": 82.0, "mass": 0.769, "palletId": 7, "actual": 700}, {"id": 2, "partNo": "55110-C5050CA", "name": "ARM ASS'Y-RR UPR (방청)", "category": "ARM", "tag": "U/ARM RR(도장)", "w": 348.0, "d": 96.0, "h": 38.0, "mass": 0.767, "palletId": 7, "actual": 483}, {"id": 3, "partNo": "55212-S1000", "name": "PROTECTOR-RR ASSIST ARM", "category": "ARM", "tag": "PROTECTOR", "w": 273.0, "d": 58.0, "h": 26.0, "mass": 0.035, "palletId": 7, "actual": 1320}, {"id": 4, "partNo": "55260-S1000W", "name": "ARM-RR ASSIST", "category": "ARM", "tag": "A/ARM RR", "w": 305.9, "d": 50.0, "h": 30.0, "mass": 0.568, "palletId": 7, "actual": 1400}, {"id": 5, "partNo": "55280-S1000W", "name": "RR T/ARM ASSY,LH", "category": "ARM", "tag": "T/ARM RR", "w": 497.6, "d": 181.8, "h": 61.4, "mass": 1.478, "palletId": 4, "actual": 400}, {"id": 6, "partNo": "55281-S1000W", "name": "RR T/ARM ASSY,RH", "category": "ARM", "tag": "T/ARM RR", "w": 497.6, "d": 181.8, "h": 61.4, "mass": 1.458, "palletId": 4, "actual": 400}, {"id": 7, "partNo": "62470-S1000", "name": "BRKT ASSY-BODY MT'G, LH", "category": "FRT MBR", "tag": "BODY MTG", "w": 199.0, "d": 120.0, "h": 77.4, "mass": 0.94, "palletId": 7, "actual": 280}, {"id": 8, "partNo": "62473-S1000", "name": "STOPPER LWR, FR", "category": "FRT MBR", "tag": "STOPPER", "w": 57.0, "d": 49.0, "h": 17.0, "mass": 0.0385, "palletId": 7, "actual": 9000}, {"id": 9, "partNo": "62480-S1000", "name": "BRKT ASSY-BODY MT'G, RH", "category": "FRT MBR", "tag": "BODY MTG", "w": 199.0, "d": 120.0, "h": 77.4, "mass": 0.94, "palletId": 7, "actual": 280}, {"id": 10, "partNo": "55220-S1051W", "name": "ARM ASSY-RR LWR", "category": "ARM", "tag": "L/ARM RR", "w": 572.0, "d": 134.0, "h": 131.0, "mass": 3.154, "palletId": 3, "actual": 200}, {"id": 11, "partNo": "54584-S1000S", "name": "G BUSH", "category": "ARM", "tag": "BUSH", "w": 68.0, "d": 68.0, "h": 60.0, "mass": 0.401, "palletId": 7, "actual": 900}, {"id": 12, "partNo": "55274-S1000S", "name": "BUSH-RR TRAILING ARM,LH", "category": "ARM", "tag": "BUSH", "w": 80.0, "d": 80.0, "h": 128.5, "mass": 0.432, "palletId": 7, "actual": 800}, {"id": 13, "partNo": "55275-S1000S", "name": "BUSH-RR TRAILING ARM,RH", "category": "ARM", "tag": "BUSH", "w": 80.0, "d": 80.0, "h": 128.5, "mass": 0.432, "palletId": 7, "actual": 800}, {"id": 14, "partNo": "62418-S1000S", "name": "BUSHING, FR", "category": "FRT MBR", "tag": "BUSH", "w": 55.0, "d": 55.0, "h": 56.0, "mass": 0.184, "palletId": 7, "actual": 1920}, {"id": 15, "partNo": "62486-S1000S", "name": "BUSHING, RR", "category": "FRT MBR", "tag": "BUSH", "w": 75.0, "d": 75.0, "h": 75.0, "mass": 0.332, "palletId": 7, "actual": 960}, {"id": 16, "partNo": "54551-C5000#1", "name": "FRT A' BUSH", "category": "ARM", "tag": "BUSH", "w": 48.0, "d": 48.0, "h": 55.0, "mass": 0.232, "palletId": 7, "actual": 1680}, {"id": 17, "partNo": "11404-10206K", "name": "BOLT FLANGE (M10)", "category": "H/W", "tag": "H/W", "w": 19.0, "d": 19.0, "h": 30.0, "mass": 0.02, "palletId": 7, "actual": 22400}, {"id": 18, "partNo": "62474-C6000", "name": "CUP, FR LH", "category": "FRT MBR", "tag": "CUP", "w": 61.8, "d": 58.7, "h": 44.1, "mass": 0.126, "palletId": 7, "actual": 2800}, {"id": 19, "partNo": "62474-C6100", "name": "CUP, FR, RH", "category": "FRT MBR", "tag": "CUP", "w": 61.8, "d": 58.7, "h": 44.1, "mass": 0.126, "palletId": 7, "actual": 2800}, {"id": 20, "partNo": "55485-C5000", "name": "STOPPER- BODY MT'G", "category": "RR MBR", "tag": "STOPPER", "w": 76.0, "d": 76.0, "h": 8.0, "mass": 0.064, "palletId": 7, "actual": 5400}, {"id": 21, "partNo": "55477-C5000", "name": "STOPPER-LWR, RR", "category": "RR MBR", "tag": "STOPPER", "w": 83.0, "d": 83.0, "h": 20.0, "mass": 0.087, "palletId": 7, "actual": 4320}, {"id": 22, "partNo": "55497-C5000", "name": "RAIL", "category": "RR MBR", "tag": "RAIL", "w": 228.0, "d": 142.0, "h": 20.0, "mass": 0.188, "palletId": 7, "actual": 2000}, {"id": 23, "partNo": "62490-S1000", "name": "HANGER ASSY-MUFFLER, A", "category": "FRT MBR", "tag": "HANGER", "w": 108.9, "d": 58.2, "h": 51.9, "mass": 0.2193, "palletId": 7, "actual": 2100}, {"id": 24, "partNo": "62490-S1400", "name": "HANGER ASSY-MUFFLER, E", "category": "FRT MBR", "tag": "HANGER", "w": 120.0, "d": 54.0, "h": 45.0, "mass": 0.2054, "palletId": 7, "actual": 2100}, {"id": 26, "partNo": "55420-S8050", "name": "MBR MAIN ASSY-NO.1", "category": "RR MBR", "tag": "NO.1 RR", "w": 1173.0, "d": 161.0, "h": 107.0, "mass": 4.88, "palletId": 3, "actual": 104}, {"id": 27, "partNo": "55420-S8250", "name": "MBR MAIN ASSY-NO.1(4WD)", "category": "RR MBR", "tag": "NO.1 RR", "w": 1173.0, "d": 161.0, "h": 140.0, "mass": 5.938, "palletId": 3, "actual": 75}, {"id": 28, "partNo": "55430-S8050", "name": "MBR ASSY-NO.2", "category": "RR MBR", "tag": "NO.2 RR", "w": 873.0, "d": 220.0, "h": 173.0, "mass": 6.664, "palletId": 1, "actual": 100}, {"id": 29, "partNo": "55440-S8050", "name": "MBR MAIN ASSY-SIDE, LH", "category": "RR MBR", "tag": "SIDE RR", "w": 447.0, "d": 257.0, "h": 141.0, "mass": 2.467, "palletId": 3, "actual": 160}, {"id": 30, "partNo": "55450-S8050", "name": "MBR MAIN ASSY-SIDE, RH", "category": "RR MBR", "tag": "SIDE RR", "w": 447.0, "d": 257.0, "h": 141.0, "mass": 2.467, "palletId": 3, "actual": 160}, {"id": 31, "partNo": "55460-S8050", "name": "BRKT ASSY-A/ARM, LH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 210.0, "d": 131.0, "h": 105.0, "mass": 0.977, "palletId": 7, "actual": 200}, {"id": 32, "partNo": "55465-S8050", "name": "BRKT ASSY-A/ARM, RH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 210.0, "d": 131.0, "h": 105.0, "mass": 0.977, "palletId": 7, "actual": 200}, {"id": 33, "partNo": "55473-S8050", "name": "BRKT ASSY-S/BAR MT'G, LH", "category": "RR MBR", "tag": "BRKT", "w": 110.0, "d": 94.0, "h": 197.0, "mass": 0.6, "palletId": 7, "actual": 440}, {"id": 34, "partNo": "55483-S8050", "name": "BRKT ASSY-S/BAR MT'G, RH", "category": "RR MBR", "tag": "BRKT", "w": 110.0, "d": 91.0, "h": 193.0, "mass": 0.6, "palletId": 7, "actual": 440}, {"id": 35, "partNo": "55530-S8000", "name": "S/BAR LINK ASS'Y", "category": "ARM", "tag": "LINK", "w": 164.5, "d": 39.4, "h": 76.2, "mass": 0.355, "palletId": 7, "actual": 1000}, {"id": 36, "partNo": "55258-S8000", "name": "BUSHING-ASSIST ARM", "category": "ARM", "tag": "BUSH", "w": 40.0, "d": 42.0, "h": 48.0, "mass": 0.1123, "palletId": 7, "actual": 3200}, {"id": 37, "partNo": "55138-S8000", "name": "BUSHING-RR UPR ARM", "category": "ARM", "tag": "BUSH", "w": 41.0, "d": 41.0, "h": 49.0, "mass": 0.136, "palletId": 7, "actual": 2800}, {"id": 38, "partNo": "54510-S8100W", "name": "LWR ARM ASSY-FR, LH", "category": "ARM", "tag": "L/ARM FRT", "w": 435.0, "d": 415.0, "h": 64.0, "mass": 4.272, "palletId": 3, "actual": 210}, {"id": 39, "partNo": "54511-S8100W", "name": "ARM ASSY FR-LWR ARM, RH", "category": "ARM", "tag": "L/ARM FRT", "w": 435.0, "d": 415.0, "h": 64.0, "mass": 4.246, "palletId": 3, "actual": 210}, {"id": 47, "partNo": "13905-06000B", "name": "NUT-WELD (M6)", "category": "H/W", "tag": "H/W", "w": 11.2, "d": 11.2, "h": 6.0, "mass": 0.002, "palletId": 7, "actual": 225000}, {"id": 52, "partNo": "21762-S1100", "name": "BUSH-DIFF MTG, FR", "category": "RR MBR", "tag": "BUSH", "w": 70.0, "d": 70.0, "h": 55.0, "mass": 0.218, "palletId": 7, "actual": 1360}, {"id": 53, "partNo": "21762-S8100", "name": "BUSH-DIFF MTG, FR", "category": "RR MBR", "tag": "BUSH", "w": 71.0, "d": 70.0, "h": 56.0, "mass": 0.2433, "palletId": 7, "actual": 1360}, {"id": 54, "partNo": "21772-S1100", "name": "BUSH-DIFF MTG, RR", "category": "RR MBR", "tag": "BUSH", "w": 80.0, "d": 80.0, "h": 62.0, "mass": 0.365, "palletId": 7, "actual": 900}, {"id": 55, "partNo": "55333-S1000", "name": "PAD-RR SPRING, LWR", "category": "RR MBR", "tag": "PAD", "w": 90.0, "d": 90.0, "h": 37.0, "mass": 0.129, "palletId": 7, "actual": 1800}, {"id": 56, "partNo": "55530-C5001", "name": "S/BAR LINK ASS'Y", "category": "ARM", "tag": "LINK", "w": 162.0, "d": 62.0, "h": 68.0, "mass": 0.352, "palletId": 7, "actual": 1000}, {"id": 57, "partNo": "55212-S8000", "name": "COVER-RR LWR ARM, LH", "category": "ARM", "tag": "PROTECTOR", "w": 462.0, "d": 100.0, "h": 72.0, "mass": 0.06, "palletId": 7, "actual": 1190}, {"id": 58, "partNo": "55213-S8000", "name": "COVER-RR LWR ARM, RH", "category": "ARM", "tag": "PROTECTOR", "w": 462.0, "d": 100.0, "h": 72.0, "mass": 0.0569, "palletId": 7, "actual": 1190}, {"id": 59, "partNo": "55218-S1000S", "name": "BUSH-RR LWR ARM", "category": "ARM", "tag": "BUSH", "w": 49.0, "d": 52.0, "h": 72.0, "mass": 0.277, "palletId": 7, "actual": 1400}, {"id": 60, "partNo": "55417-S1000S", "name": "BUSH-BODY MT'G, FR", "category": "RR MBR", "tag": "BUSH", "w": 87.0, "d": 92.0, "h": 74.0, "mass": 0.362, "palletId": 7, "actual": 800}, {"id": 61, "partNo": "55418-S1000S", "name": "BUSH-BODY MT'G, RR", "category": "RR MBR", "tag": "BUSH", "w": 87.0, "d": 87.0, "h": 74.0, "mass": 0.362, "palletId": 7, "actual": 800}, {"id": 62, "partNo": "55230-L0000", "name": "CHIPPING PROTECTOR-RR LWR, LH", "category": "ARM", "tag": "PROTECTOR", "w": 595.0, "d": 89.0, "h": 153.0, "mass": 0.1205, "palletId": 7, "actual": 144}, {"id": 63, "partNo": "55231-L0000", "name": "CHIPPING PROTECTOR-RR LWR, RH", "category": "ARM", "tag": "PROTECTOR", "w": 595.0, "d": 89.0, "h": 153.0, "mass": 0.1205, "palletId": 7, "actual": 144}, {"id": 67, "partNo": "55428-L0000", "name": "HANGER-MUFFLER", "category": "RR MBR", "tag": "HANGER", "w": 79.0, "d": 85.0, "h": 72.0, "mass": 0.1962, "palletId": 7, "actual": 2310}, {"id": 68, "partNo": "62496-L1000", "name": "PIPE NUT-G/BOX MTG, B", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 33.0, "d": 33.0, "h": 75.0, "mass": 0.2373, "palletId": 7, "actual": 1900}, {"id": 69, "partNo": "62497-L1000", "name": "PIPE NUT-G/BOX MTG, C", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 33.0, "d": 33.0, "h": 58.0, "mass": 0.1993, "palletId": 7, "actual": 2250}, {"id": 70, "partNo": "62499-L1000", "name": "BRKT ASSY-D/DAMPER MTG", "category": "FRT MBR", "tag": "BRKT DAMPER", "w": 164.0, "d": 56.0, "h": 56.0, "mass": 0.374, "palletId": 7, "actual": 990}, {"id": 71, "partNo": "55434-L0000", "name": "REINF-MEMBER NO.2. LH", "category": "RR MBR", "tag": "BRKT", "w": 119.0, "d": 172.0, "h": 53.0, "mass": 0.2354, "palletId": 7, "actual": 1800}, {"id": 72, "partNo": "55435-L0000", "name": "REINF-MEMBER NO.2, RH", "category": "RR MBR", "tag": "BRKT", "w": 119.0, "d": 172.0, "h": 53.0, "mass": 0.2348, "palletId": 7, "actual": 1800}, {"id": 73, "partNo": "55436-L0000", "name": "REINF-MEMBER NO.2, CTR", "category": "RR MBR", "tag": "BRKT", "w": 85.0, "d": 185.0, "h": 42.0, "mass": 0.2362, "palletId": 7, "actual": 1800}, {"id": 74, "partNo": "55465-L0000", "name": "BRKT ASSY-A/ARM, LH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 246.0, "d": 111.0, "h": 102.0, "mass": 0.686, "palletId": 7, "actual": 200}, {"id": 75, "partNo": "55475-L0000", "name": "BRKT ASSY-A/ARM, RH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 246.0, "d": 111.0, "h": 102.0, "mass": 0.686, "palletId": 7, "actual": 200}, {"id": 76, "partNo": "62430-L1000", "name": "CROSS MBR ASSY-NO.2(방청)", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 388.0, "d": 274.0, "h": 75.0, "mass": 3.468, "palletId": 3, "actual": 168}, {"id": 77, "partNo": "55427-L0000", "name": "PIPE-BODY MTG", "category": "RR MBR", "tag": "PIPE", "w": 67.0, "d": 67.0, "h": 60.0, "mass": 0.2744, "palletId": 4, "actual": 2040}, {"id": 78, "partNo": "55485-L0000", "name": "STOPPER-LWR", "category": "RR MBR", "tag": "STOPPER", "w": 58.0, "d": 74.0, "h": 17.0, "mass": 0.083, "palletId": 7, "actual": 4320}, {"id": 79, "partNo": "55220-L0000", "name": "ARM ASSY-RR L/ARM", "category": "ARM", "tag": "L/ARM RR", "w": 663.0, "d": 207.0, "h": 128.0, "mass": 2.828, "palletId": 1, "actual": 288}, {"id": 80, "partNo": "55125-L0000CA", "name": "ARM ASSY-RR UPR", "category": "ARM", "tag": "U/ARM RR(도장)", "w": 373.0, "d": 146.0, "h": 32.0, "mass": 1.014, "palletId": 7, "actual": 240}, {"id": 81, "partNo": "55448-L0000", "name": "BRKT-UPR ARM, LH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 118.0, "d": 133.0, "h": 109.0, "mass": 0.2975, "palletId": 7, "actual": 600}, {"id": 82, "partNo": "55458-L0000", "name": "BRKT-UPR ARM, RH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 118.0, "d": 133.0, "h": 109.0, "mass": 0.2995, "palletId": 7, "actual": 600}, {"id": 83, "partNo": "62420-L1000", "name": "CROSS MBR ASSY-NO.1(방청)", "category": "FRT MBR", "tag": "NO.1 RR", "w": 1265.0, "d": 118.0, "h": 75.0, "mass": 3.087, "palletId": 3, "actual": 154}, {"id": 84, "partNo": "62440-L1000WD", "name": "SIDE MBR ASSY,LH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1045.0, "d": 384.0, "h": 152.0, "mass": 7.126, "palletId": 3, "actual": 60}, {"id": 85, "partNo": "62450-L1000WD", "name": "SIDE MBR ASSY,RH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1049.0, "d": 384.0, "h": 152.0, "mass": 7.083, "palletId": 3, "actual": 60}, {"id": 86, "partNo": "55260-L0000", "name": "ARM ASSY-RR ASSIST", "category": "ARM", "tag": "A/ARM RR", "w": 359.0, "d": 69.0, "h": 63.0, "mass": 0.66, "palletId": 7, "actual": 400}, {"id": 87, "partNo": "12900-06160B", "name": "BOLT WELD", "category": "H/W", "tag": "H/W", "w": 14.0, "d": 14.0, "h": 20.4, "mass": 0.005, "palletId": 7, "actual": 90000}, {"id": 93, "partNo": "55428-L3500", "name": "BRKT ASSY-S/BAR MTG, RH", "category": "RR MBR", "tag": "HANGER", "w": 84.0, "d": 76.2, "h": 23.9, "mass": 0.183, "palletId": 7, "actual": 2560}, {"id": 94, "partNo": "55400-L3500", "name": "BRKT ASSY-DIFF MTG, LH", "category": "RR MBR", "tag": "BRKT DIFF", "w": 141.3, "d": 95.5, "h": 81.6, "mass": 0.538, "palletId": 7, "actual": 532}, {"id": 95, "partNo": "55401-L3500", "name": "BRKT ASSY-DIFF MTG, RH", "category": "RR MBR", "tag": "BRKT DIFF", "w": 141.3, "d": 95.5, "h": 81.6, "mass": 0.542, "palletId": 7, "actual": 532}, {"id": 96, "partNo": "554A7-L3500", "name": "CUP-DIFF MTG, RR", "category": "RR MBR", "tag": "CUP", "w": 98.0, "d": 98.0, "h": 50.0, "mass": 0.225, "palletId": 3, "actual": 2340}, {"id": 97, "partNo": "554G0-L3500", "name": "BRKT ASSY-S/BAR MTG, LH", "category": "RR MBR", "tag": "BRKT", "w": 116.2, "d": 92.8, "h": 149.4, "mass": 0.403, "palletId": 7, "actual": 600}, {"id": 98, "partNo": "554G1-L3500", "name": "BRKT ASSY-S/BAR MTG, RH", "category": "RR MBR", "tag": "BRKT", "w": 116.2, "d": 92.8, "h": 149.4, "mass": 0.402, "palletId": 7, "actual": 600}, {"id": 99, "partNo": "55220-L3500", "name": "ARM ASSY-LWR", "category": "ARM", "tag": "L/ARM RR", "w": 585.6, "d": 203.4, "h": 130.2, "mass": 2.495, "palletId": 1, "actual": 288}, {"id": 100, "partNo": "55230-L3500", "name": "CHIPPING PROTECTOR-RR LWR, LH", "category": "ARM", "tag": "PROTECTOR", "w": 524.0, "d": 87.5, "h": 113.3, "mass": 0.112, "palletId": 7, "actual": 270}, {"id": 101, "partNo": "55231-L3500", "name": "CHIPPING PROTECTOR-RR LWR, RH", "category": "ARM", "tag": "PROTECTOR", "w": 524.0, "d": 87.5, "h": 113.3, "mass": 0.112, "palletId": 7, "actual": 270}, {"id": 102, "partNo": "55260-L3500", "name": "ARM ASSY-RR ASSIST", "category": "ARM", "tag": "A/ARM RR", "w": 323.5, "d": 62.7, "h": 55.8, "mass": 0.537, "palletId": 7, "actual": 480}, {"id": 103, "partNo": "55280-L3500", "name": "ARM ASSY-RR TRAILING, LH", "category": "ARM", "tag": "T/ARM RR", "w": 458.9, "d": 194.9, "h": 51.8, "mass": 1.488, "palletId": 4, "actual": 400}, {"id": 104, "partNo": "55281-L3500", "name": "ARM ASSY-RR TRAILING, RH", "category": "ARM", "tag": "T/ARM RR", "w": 458.9, "d": 194.9, "h": 51.8, "mass": 1.483, "palletId": 4, "actual": 400}, {"id": 107, "partNo": "62420-P2000", "name": "CROSS MBR ASSY-NO.1(방청)", "category": "FRT MBR", "tag": "NO.1 RR", "w": 1265.0, "d": 114.0, "h": 68.0, "mass": 2.999, "palletId": 3, "actual": 154}, {"id": 108, "partNo": "62430-R5000", "name": "CROSS MBR ASSY-NO.2", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 388.0, "d": 273.0, "h": 75.0, "mass": 3.481, "palletId": 3, "actual": 168}, {"id": 109, "partNo": "62422-P2000", "name": "CUP ASSY, FR", "category": "FRT MBR", "tag": "CUP", "w": 91.0, "d": 91.0, "h": 169.0, "mass": 0.86, "palletId": 7, "actual": 384}, {"id": 110, "partNo": "21760-P2000", "name": "BRKT ASSY-RR DIFF MTG FR", "category": "RR MBR", "tag": "BRKT DIFF", "w": 140.0, "d": 90.0, "h": 82.0, "mass": 0.515, "palletId": 7, "actual": 552}, {"id": 111, "partNo": "55433-S1000", "name": "PIPE RR-DIFF MT'G, RH", "category": "RR MBR", "tag": "PIPE", "w": 87.0, "d": 87.0, "h": 50.0, "mass": 0.355, "palletId": 4, "actual": 1680}, {"id": 112, "partNo": "55260-P2000W", "name": "ARM-RR ASSIST", "category": "ARM", "tag": "A/ARM RR", "w": 295.0, "d": 50.0, "h": 30.0, "mass": 0.562, "palletId": 7, "actual": 1400}, {"id": 113, "partNo": "62440-P2001", "name": "CROSS MBR ASSY, LH(방청)", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1086.0, "d": 386.0, "h": 127.0, "mass": 8.383, "palletId": 3, "actual": 54}, {"id": 114, "partNo": "62450-P2001", "name": "CROSS MBR ASSY, RH(방청)", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1089.0, "d": 386.0, "h": 127.0, "mass": 8.318, "palletId": 3, "actual": 54}, {"id": 115, "partNo": "62496-P2000", "name": "PIPE NUT-G/BOX MTG, B", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 33.0, "d": 33.0, "h": 82.0, "mass": 0.254, "palletId": 7, "actual": 1800}, {"id": 116, "partNo": "62485-P2000", "name": "STOPPER LWR,FR", "category": "FRT MBR", "tag": "STOPPER", "w": 72.0, "d": 72.0, "h": 11.0, "mass": 0.057, "palletId": 7, "actual": 6360}, {"id": 117, "partNo": "54510-P2000W", "name": "LWR ARM ASSY-FR, LH (방청)", "category": "ARM", "tag": "L/ARM FRT", "w": 402.0, "d": 419.0, "h": 88.0, "mass": 3.419, "palletId": 3, "actual": 240}, {"id": 118, "partNo": "54511-P2000W", "name": "LWR ARM ASSY-FR, RH (방청)", "category": "ARM", "tag": "L/ARM FRT", "w": 402.0, "d": 419.0, "h": 88.0, "mass": 3.408, "palletId": 3, "actual": 240}, {"id": 119, "partNo": "55125-P2000CA", "name": "ARM ASSY-RR UPR (방청)", "category": "ARM", "tag": "U/ARM RR(도장)", "w": 370.0, "d": 134.0, "h": 38.0, "mass": 0.971, "palletId": 7, "actual": 330}, {"id": 120, "partNo": "55428-P2000", "name": "HANGER-MUFFLER", "category": "RR MBR", "tag": "HANGER", "w": 109.0, "d": 44.0, "h": 17.0, "mass": 0.108, "palletId": 7, "actual": 4290}, {"id": 122, "partNo": "55416-S1000", "name": "CUP-BODY MT'G", "category": "RR MBR", "tag": "CUP", "w": 96.0, "d": 96.0, "h": 57.0, "mass": 0.272, "palletId": 4, "actual": 1890}, {"id": 123, "partNo": "55465-P2000", "name": "BRKT ASSY-A/ARM, LH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 252.0, "d": 154.0, "h": 98.0, "mass": 0.872, "palletId": 7, "actual": 200}, {"id": 124, "partNo": "55475-P2000", "name": "BRKT ASSY-A/ARM, RH", "category": "RR MBR", "tag": "BRKT A/ARM", "w": 252.0, "d": 154.0, "h": 98.0, "mass": 0.887, "palletId": 7, "actual": 200}, {"id": 125, "partNo": "55220-P2000W", "name": "RR L/ARM ASSY(방청)", "category": "ARM", "tag": "L/ARM RR", "w": 579.0, "d": 136.0, "h": 131.0, "mass": 3.108, "palletId": 3, "actual": 220}, {"id": 126, "partNo": "55280-P2000W", "name": "RR T/ARM ASSY,LH", "category": "ARM", "tag": "T/ARM RR", "w": 481.0, "d": 192.0, "h": 53.0, "mass": 1.592, "palletId": 4, "actual": 400}, {"id": 127, "partNo": "55280-S2AA0W", "name": "RR T/ARM ASSY,LH", "category": "ARM", "tag": "T/ARM RR", "w": 481.0, "d": 192.0, "h": 51.0, "mass": 1.562, "palletId": 4, "actual": 400}, {"id": 128, "partNo": "55281-P2000W", "name": "RR T/ARM ASSY,RH", "category": "ARM", "tag": "T/ARM RR", "w": 481.0, "d": 192.0, "h": 53.0, "mass": 1.595, "palletId": 4, "actual": 400}, {"id": 129, "partNo": "55281-S2AA0W", "name": "RR T/ARM ASSY,RH", "category": "ARM", "tag": "T/ARM RR", "w": 481.0, "d": 192.0, "h": 51.0, "mass": 1.563, "palletId": 4, "actual": 400}, {"id": 130, "partNo": "55254-P2000", "name": "CHIPPING PROTECTOR", "category": "ARM", "tag": "PROTECTOR", "w": 303.0, "d": 58.0, "h": 26.0, "mass": 0.039, "palletId": 7, "actual": 1080}, {"id": 131, "partNo": "54530-P2000", "name": "B/JOINT ASSY", "category": "ARM", "tag": "B/JOINT", "w": 145.0, "d": 72.0, "h": 82.0, "mass": 0.76, "palletId": 7, "actual": 700}, {"id": 132, "partNo": "64511-P2000", "name": "PNL ASSY-FNDR / APRON INR FR, LH", "category": "F/APRON", "tag": "BRKT", "w": 338.6, "d": 227.0, "h": 66.8, "mass": 0.327, "palletId": 7, "actual": 900}, {"id": 133, "partNo": "64522-P2000", "name": "PNL-FENDER APRON INR FR, RH", "category": "F/APRON", "tag": "FENDER APRON PNL", "w": 335.7, "d": 313.2, "h": 121.2, "mass": 0.383, "palletId": 7, "actual": 900}, {"id": 134, "partNo": "645K4-P2000", "name": "PNL-F/APRON UPR LWR, LH", "category": "F/APRON", "tag": "BRKT", "w": 382.0, "d": 144.1, "h": 74.0, "mass": 0.323, "palletId": 7, "actual": 1200}, {"id": 135, "partNo": "645L4-P2000", "name": "PNL-F/APRON FR LWR, RH", "category": "F/APRON", "tag": "BRKT", "w": 382.0, "d": 144.1, "h": 74.0, "mass": 0.325, "palletId": 7, "actual": 1200}, {"id": 136, "partNo": "64537-GA000", "name": "REINF ASSY-FNDR / APRON FR LWR, LH", "category": "F/APRON", "tag": "BRKT", "w": 262.8, "d": 160.0, "h": 129.1, "mass": 0.4785, "palletId": 7, "actual": 400}, {"id": 137, "partNo": "64595-P2000", "name": "BRKT ASSY-JUNTION BOX FR MT'G", "category": "F/APRON", "tag": "BRKT", "w": 57.3, "d": 34.2, "h": 72.5, "mass": 0.029, "palletId": 7, "actual": 9000}, {"id": 138, "partNo": "64715-P2000", "name": "BRKT ASSY-AIR CLEANER MT'G, LH", "category": "F/APRON", "tag": "BRKT", "w": 37.6, "d": 37.2, "h": 51.0, "mass": 0.0328, "palletId": 7, "actual": 10500}, {"id": 139, "partNo": "64873-P2000", "name": "BRKT ASSY-AIR INTAKE TM'G SIDE", "category": "F/APRON", "tag": "BRKT", "w": 39.2, "d": 38.1, "h": 23.1, "mass": 0.019, "palletId": 7, "actual": 15000}, {"id": 140, "partNo": "64555-P2000", "name": "REINF ASSY-SHK / ABS HSG, LH", "category": "F/APRON", "tag": "BRKT", "w": 292.6, "d": 166.6, "h": 57.8, "mass": 0.232, "palletId": 7, "actual": 1500}, {"id": 141, "partNo": "64566-P2000", "name": "REINF-SHK/ABS HSG, RH", "category": "F/APRON", "tag": "BRKT", "w": 292.6, "d": 166.6, "h": 57.8, "mass": 0.231, "palletId": 7, "actual": 1500}, {"id": 142, "partNo": "64593-P2000", "name": "BRKT ASSY-H.E.C.U MT'G", "category": "F/APRON", "tag": "BRKT", "w": 116.7, "d": 74.0, "h": 50.6, "mass": 0.11, "palletId": 7, "actual": 1650}, {"id": 143, "partNo": "645D5-P2000", "name": "BRKT ASSY-RSVR TANK MT'G FR, RH", "category": "F/APRON", "tag": "BRKT", "w": 61.9, "d": 40.9, "h": 25.1, "mass": 0.024, "palletId": 7, "actual": 9000}, {"id": 144, "partNo": "64756-P2000", "name": "SUPPORT-FR SHK / ABS HSG, LH", "category": "F/APRON", "tag": "BRKT", "w": 87.9, "d": 51.9, "h": 54.4, "mass": 0.072, "palletId": 7, "actual": 6000}, {"id": 145, "partNo": "64766-P2000", "name": "SUPPORT-FR SHK/ABS HSG, RH", "category": "F/APRON", "tag": "BRKT", "w": 87.9, "d": 51.9, "h": 54.4, "mass": 0.073, "palletId": 7, "actual": 6000}, {"id": 146, "partNo": "64854-P2000", "name": "REINF-FR BODY MTG UPR, LH", "category": "F/APRON", "tag": "BRKT", "w": 83.2, "d": 48.7, "h": 106.1, "mass": 0.079, "palletId": 7, "actual": 4000}, {"id": 147, "partNo": "64864-P2000", "name": "REINF-FR BODY MTG UPR, RH", "category": "F/APRON", "tag": "BRKT", "w": 83.2, "d": 48.7, "h": 106.1, "mass": 0.079, "palletId": 7, "actual": 4000}, {"id": 148, "partNo": "66752-S1500", "name": "PNL-COWL SIDE UPR INR, LH", "category": "COWL COMPL", "tag": "COWL SIDE PNL", "w": 454.1, "d": 144.1, "h": 116.0, "mass": 0.343, "palletId": 7, "actual": 1000}, {"id": 149, "partNo": "66762-S1500", "name": "PNL-COWL SUDE UPR INR, RH", "category": "COWL COMPL", "tag": "COWL SIDE PNL", "w": 454.1, "d": 144.1, "h": 116.0, "mass": 0.341, "palletId": 7, "actual": 1000}, {"id": 150, "partNo": "64437-S1500", "name": "BRKT ASSY-WIPER PIVOT SIDE MT'G", "category": "COWL COMPL", "tag": "BRKT", "w": 66.2, "d": 44.7, "h": 64.1, "mass": 0.045, "palletId": 7, "actual": 6000}, {"id": 151, "partNo": "64818-S1500", "name": "BRKT-FENDER UPR RR MT'G, LH", "category": "F/APRON", "tag": "BRKT", "w": 190.8, "d": 145.6, "h": 87.6, "mass": 0.15, "palletId": 7, "actual": 2000}, {"id": 152, "partNo": "64828-S1500", "name": "BRKT-FENDER UPR RR MT'G, RH", "category": "F/APRON", "tag": "BRKT", "w": 190.8, "d": 145.6, "h": 87.6, "mass": 0.151, "palletId": 7, "actual": 2000}, {"id": 153, "partNo": "64815-S1500", "name": "BRKT ASSY-GAS LIFTER MT'G ,LH", "category": "F/APRON", "tag": "BRKT", "w": 65.1, "d": 34.6, "h": 37.0, "mass": 0.046, "palletId": 7, "actual": 9600}, {"id": 154, "partNo": "64691-P2000", "name": "REINF ASSY-TRANSMISSION MT'G", "category": "F/APRON", "tag": "BRKT", "w": 188.5, "d": 130.1, "h": 52.6, "mass": 0.236, "palletId": 7, "actual": 800}, {"id": 155, "partNo": "64617-L1000", "name": "BRKT ASSY-BATTERY TRAY LEG", "category": "F/APRON", "tag": "BRKT", "w": 133.5, "d": 44.8, "h": 156.3, "mass": 0.153, "palletId": 7, "actual": 1000}, {"id": 156, "partNo": "64717-S2000", "name": "BRKT ASSY-ENGINE MT'G RR, LH", "category": "F/APRON", "tag": "BRKT", "w": 293.9, "d": 234.7, "h": 75.8, "mass": 0.744, "palletId": 7, "actual": 250}, {"id": 157, "partNo": "64638-P2000", "name": "REINF-SUB FRAME MT'G RR, LH", "category": "F/APRON", "tag": "BRKT", "w": 156.3, "d": 127.1, "h": 62.2, "mass": 0.337, "palletId": 7, "actual": 1000}, {"id": 158, "partNo": "64648-P2000", "name": "REINF-SUB FRAME MT'G RR, RH", "category": "F/APRON", "tag": "BRKT", "w": 156.3, "d": 127.1, "h": 62.2, "mass": 0.339, "palletId": 7, "actual": 1000}, {"id": 159, "partNo": "64654-P2000", "name": "REINF-FR SIDE RR LWR MEMBER, LH", "category": "F/APRON", "tag": "BRKT", "w": 281.1, "d": 131.7, "h": 30.4, "mass": 0.335, "palletId": 7, "actual": 1000}, {"id": 160, "partNo": "64664-P2000", "name": "REINF-FR SIDE RR LWR MEMBER, RH", "category": "F/APRON", "tag": "BRKT", "w": 281.1, "d": 131.7, "h": 30.4, "mass": 0.333, "palletId": 7, "actual": 1000}, {"id": 161, "partNo": "643C4-P2000", "name": "MEMBER-DASH TUNNEL, LH", "category": "F/APRON", "tag": "BRKT", "w": 95.1, "d": 89.5, "h": 37.9, "mass": 0.081, "palletId": 7, "actual": 6000}, {"id": 162, "partNo": "643D4-P2000", "name": "MEMBER-DASH TUNNEL, RH", "category": "F/APRON", "tag": "BRKT", "w": 95.1, "d": 89.5, "h": 37.9, "mass": 0.082, "palletId": 7, "actual": 6000}, {"id": 163, "partNo": "64754-P2000", "name": "REINF-FR SIDE MEMBER INR FR, LH", "category": "F/APRON", "tag": "BRKT", "w": 79.9, "d": 78.4, "h": 27.4, "mass": 0.071, "palletId": 7, "actual": 4500}, {"id": 164, "partNo": "64764-P2000", "name": "REINF-FR SIDE MEMBER INR FR, RH", "category": "F/APRON", "tag": "BRKT", "w": 79.9, "d": 78.4, "h": 27.4, "mass": 0.071, "palletId": 7, "actual": 4500}, {"id": 165, "partNo": "64652-P2000", "name": "EXTN-FR S/MBR LWR, LH", "category": "F/APRON", "tag": "BRKT", "w": 161.2, "d": 112.3, "h": 99.5, "mass": 0.316, "palletId": 7, "actual": 1500}, {"id": 166, "partNo": "64662-P2000", "name": "EXTN-FR S/MBR LWR, RH", "category": "F/APRON", "tag": "BRKT", "w": 156.7, "d": 112.3, "h": 99.5, "mass": 0.312, "palletId": 7, "actual": 1500}, {"id": 167, "partNo": "645G3-P2000", "name": "BRKT ASSY-WASHER RESERVOIR MT'G", "category": "F/APRON", "tag": "BRKT", "w": 49.9, "d": 40.0, "h": 9.6, "mass": 0.017, "palletId": 7, "actual": 15000}, {"id": 169, "partNo": "64696-C1000", "name": "PIPE", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 20.0, "d": 20.0, "h": 28.0, "mass": 0.044, "palletId": 7, "actual": 10230}, {"id": 170, "partNo": "64898-L1000", "name": "PIPE-T/M MT'G FR", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 20.0, "d": 20.0, "h": 61.5, "mass": 0.083, "palletId": 7, "actual": 5400}, {"id": 171, "partNo": "65739-P2000", "name": "PIPE-NUT", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 36.0, "d": 36.0, "h": 58.0, "mass": 0.391, "palletId": 7, "actual": 1120}, {"id": 172, "partNo": "66785-P2000", "name": "BRKT ASSY-BRAKE PEDAL SUPT MTG", "category": "COWL COMPL", "tag": "BRKT", "w": 317.6, "d": 160.1, "h": 75.9, "mass": 0.582, "palletId": 7, "actual": 300}, {"id": 173, "partNo": "62400-S1050S", "name": "FRT C/MBR BOX'G (TMA, 방청)", "category": "FRT MBR", "tag": "C/MBR FRT", "w": 965.6, "d": 492.4, "h": 88.0, "mass": 13.4, "palletId": 1, "actual": 57}, {"id": 174, "partNo": "62430-CW050", "name": "CROSS MBR ASSY-NO.2", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 388.0, "d": 279.2, "h": 75.0, "mass": 3.39, "palletId": 3, "actual": 168}, {"id": 175, "partNo": "62430-CW150", "name": "CROSS MBR ASSY-NO.2(LDT)", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 388.0, "d": 279.2, "h": 75.0, "mass": 3.38, "palletId": 3, "actual": 168}, {"id": 176, "partNo": "62440-CW051", "name": "MBR ASSY-SIDE, LH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1039.3, "d": 533.6, "h": 124.9, "mass": 7.584, "palletId": 3, "actual": 56}, {"id": 177, "partNo": "62440-CW151", "name": "MBR ASSY-SIDE, LH(LDT)", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1039.3, "d": 533.6, "h": 124.9, "mass": 7.547, "palletId": 3, "actual": 56}, {"id": 178, "partNo": "62450-CW051", "name": "MBR ASSY-SIDE, RH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1039.3, "d": 533.6, "h": 124.9, "mass": 7.615, "palletId": 3, "actual": 56}, {"id": 179, "partNo": "62450-CW151", "name": "MBR ASSY-SIDE, RH(LDT)", "category": "FRT MBR", "tag": "SIDE FRT", "w": 1039.3, "d": 533.6, "h": 124.9, "mass": 7.59, "palletId": 3, "actual": 56}, {"id": 180, "partNo": "54510-CW050", "name": "ARM ASSY-LWR, LH", "category": "ARM", "tag": "L/ARM FRT", "w": 438.8, "d": 426.9, "h": 62.5, "mass": 2.757, "palletId": 3, "actual": 300}, {"id": 181, "partNo": "54511-CW050", "name": "ARM ASSY-LWR, RH", "category": "ARM", "tag": "L/ARM FRT", "w": 438.8, "d": 426.9, "h": 62.5, "mass": 2.751, "palletId": 3, "actual": 300}, {"id": 182, "partNo": "54530-L1000", "name": "B/JOINT ASSY", "category": "ARM", "tag": "B/JOINT", "w": 80.3, "d": 84.5, "h": 74.1, "mass": 0.595, "palletId": 7, "actual": 750}, {"id": 183, "partNo": "55428-CW000", "name": "ROD-HANGER MUFFLER (B)", "category": "RR MBR", "tag": "HANGER", "w": 90.8, "d": 70.4, "h": 16.0, "mass": 0.133, "palletId": 7, "actual": 3410}, {"id": 184, "partNo": "55230-CW500", "name": "CHIPPING PROTECTOR-A/ARM, LH", "category": "ARM", "tag": "PROTECTOR", "w": 239.2, "d": 67.5, "h": 41.2, "mass": 0.023, "palletId": 7, "actual": 1800}, {"id": 185, "partNo": "55231-CW500", "name": "CHIPPING PROTECTOR-A/ARM, RH", "category": "ARM", "tag": "PROTECTOR", "w": 239.2, "d": 67.5, "h": 41.2, "mass": 0.023, "palletId": 7, "actual": 1800}, {"id": 186, "partNo": "55280-CW000", "name": "ARM ASSY-RR TRAILING, LH", "category": "ARM", "tag": "T/ARM RR", "w": 478.0, "d": 171.1, "h": 62.3, "mass": 1.596, "palletId": 4, "actual": 400}, {"id": 187, "partNo": "55281-CW000", "name": "ARM ASSY-RR TRAILING, RH", "category": "ARM", "tag": "T/ARM RR", "w": 478.0, "d": 171.1, "h": 62.3, "mass": 1.599, "palletId": 4, "actual": 400}, {"id": 188, "partNo": "55125-CW000", "name": "ARM ASSY-RR UPR ARM", "category": "ARM", "tag": "A/ARM RR", "w": 371.5, "d": 152.7, "h": 20.0, "mass": 0.943, "palletId": 7, "actual": 1000}, {"id": 190, "partNo": "651N2-N9000", "name": "EXTN-CTR FLR S/SILL INR FR,LH", "category": "S/SILL", "tag": "BRKT", "w": 186.0, "d": 65.6, "h": 57.5, "mass": 0.202, "palletId": 7, "actual": 1680}, {"id": 191, "partNo": "651P2-N9000", "name": "EXTN-CTR FLR S/SILL INR FR,RH", "category": "S/SILL", "tag": "BRKT", "w": 186.0, "d": 65.6, "h": 57.5, "mass": 0.198, "palletId": 7, "actual": 1680}, {"id": 192, "partNo": "65104-N9000", "name": "BRKT-DR SCUFF MTG FR,LH", "category": "S/SILL", "tag": "BRKT", "w": 48.6, "d": 35.9, "h": 18.7, "mass": 0.012, "palletId": 7, "actual": 22000}, {"id": 193, "partNo": "65174-K5000", "name": "REINF-SIDE SILL INR,LH", "category": "S/SILL", "tag": "BRKT", "w": 937.0, "d": 33.3, "h": 35.0, "mass": 0.535, "palletId": 7, "actual": 1000}, {"id": 194, "partNo": "651C3-P1000", "name": "BRKT ASSY-COWL C/B SUPT MTG,LH", "category": "COWL C/BAR", "tag": "BRKT", "w": 107.4, "d": 83.5, "h": 36.8, "mass": 0.076, "palletId": 7, "actual": 3000}, {"id": 195, "partNo": "65214-P1000", "name": "REINF-CTR FLOOR SIDE MEMBER, LH", "category": "CTR FLR", "tag": "BRKT", "w": 183.0, "d": 57.4, "h": 34.3, "mass": 0.154, "palletId": 7, "actual": 2500}, {"id": 196, "partNo": "65172-P1000", "name": "PNL-SIDE SILL INR,LH", "category": "S/SILL", "tag": "SIDE SILL", "w": 1360.0, "d": 212.6, "h": 63.8, "mass": 4.174, "palletId": 3, "actual": 150}, {"id": 197, "partNo": "65182-R2000", "name": "PNL-SIDE SILL INR,RH", "category": "S/SILL", "tag": "SIDE SILL", "w": 1360.0, "d": 212.6, "h": 63.8, "mass": 4.146, "palletId": 3, "actual": 150}, {"id": 198, "partNo": "1EK.407.153", "name": "LOWER CONTROL ARM FRONT AXLE (CUV),LH", "category": "ARM", "tag": "L/ARM FRT", "w": 421.0, "d": 404.0, "h": 43.0, "mass": 2.771, "palletId": 4, "actual": 200}, {"id": 199, "partNo": "1EK.407.154", "name": "LOWER CONTROL ARM FRONT AXLE (CUV), RH", "category": "ARM", "tag": "L/ARM FRT", "w": 421.0, "d": 404.0, "h": 43.0, "mass": 2.755, "palletId": 4, "actual": 200}, {"id": 200, "partNo": "HS62440-MEB0L", "name": "PLATE ASSY-CRASH, LH", "category": "FRT MBR", "tag": "BRKT", "w": 156.0, "d": 80.0, "h": 11.0, "mass": 0.187, "palletId": 7, "actual": 2380}, {"id": 201, "partNo": "HS62440-MEB0R", "name": "PLATE ASSY-CRASH, RH", "category": "FRT MBR", "tag": "BRKT", "w": 156.0, "d": 80.0, "h": 11.0, "mass": 0.187, "palletId": 7, "actual": 2380}, {"id": 202, "partNo": "HS62460-MEB0L", "name": "ASSY-REINF, LH", "category": "FRT MBR", "tag": "BRKT", "w": 111.0, "d": 84.0, "h": 54.0, "mass": 0.176, "palletId": 7, "actual": 1750}, {"id": 203, "partNo": "HS62460-MEB0R", "name": "ASSY-REINF, RH", "category": "FRT MBR", "tag": "BRKT", "w": 111.0, "d": 84.0, "h": 54.0, "mass": 0.176, "palletId": 7, "actual": 1750}, {"id": 204, "partNo": "HS62435-MEB00", "name": "BRKT-BRIDGE MTG", "category": "FRT MBR", "tag": "BRKT", "w": 90.0, "d": 40.0, "h": 28.0, "mass": 0.194, "palletId": 7, "actual": 2590}, {"id": 205, "partNo": "HS62455-MEB00", "name": "BRKT-S/BAR MTG", "category": "FRT MBR", "tag": "BRKT", "w": 110.0, "d": 41.0, "h": 24.0, "mass": 0.141, "palletId": 7, "actual": 2940}, {"id": 206, "partNo": "62444-P2000", "name": "REINF-SIDE, LH", "category": "FRT MBR", "tag": "BRKT", "w": 50.0, "d": 215.0, "h": 83.0, "mass": 0.45, "palletId": 7, "actual": 1000}, {"id": 207, "partNo": "62455-P2000", "name": "REINF-SIDE, RH", "category": "FRT MBR", "tag": "BRKT", "w": 50.0, "d": 215.0, "h": 83.0, "mass": 0.4513, "palletId": 7, "actual": 1000}, {"id": 208, "partNo": "62444-P2101", "name": "FR REINF-SIDE, LH", "category": "FRT MBR", "tag": "BRKT", "w": 81.0, "d": 400.0, "h": 72.0, "mass": 0.3652, "palletId": 7, "actual": 720}, {"id": 209, "partNo": "62455-P2101", "name": "FR REINF-SIDE, RH", "category": "FRT MBR", "tag": "BRKT", "w": 81.0, "d": 400.0, "h": 72.0, "mass": 0.3645, "palletId": 7, "actual": 720}, {"id": 210, "partNo": "62491-P2000", "name": "PIPE NUT-A MTG, FR", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 30.0, "d": 30.0, "h": 31.0, "mass": 0.1303, "palletId": 7, "actual": 3536}, {"id": 211, "partNo": "62434-L1000", "name": "CUP, RR", "category": "FRT MBR", "tag": "CUP", "w": 84.0, "d": 84.0, "h": 65.0, "mass": 0.222, "palletId": 7, "actual": 1000}, {"id": 212, "partNo": "62493-L1000", "name": "PIPE NUT-STAB BAR MTG, FR", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 18.0, "d": 18.0, "h": 54.8, "mass": 0.065, "palletId": 7, "actual": 6600}, {"id": 213, "partNo": "62493-L1100", "name": "PIPE NUT-STAB BAR MTG, RR", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 18.0, "d": 18.0, "h": 69.8, "mass": 0.081, "palletId": 7, "actual": 5600}, {"id": 214, "partNo": "62491-L1100", "name": "PIPE NUT-A MTG, RR", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 24.0, "d": 24.0, "h": 38.8, "mass": 0.09, "palletId": 7, "actual": 4950}, {"id": 215, "partNo": "62498-P2000", "name": "BRKT ASSY-U/COVER MTG, A", "category": "FRT MBR", "tag": "BRKT", "w": 29.0, "d": 25.0, "h": 14.0, "mass": 0.015, "palletId": 7, "actual": 30000}, {"id": 216, "partNo": "62498-P2200", "name": "BRKT ASSY-U/COVER MTG, C", "category": "FRT MBR", "tag": "BRKT", "w": 34.0, "d": 44.0, "h": 15.0, "mass": 0.027, "palletId": 7, "actual": 16500}, {"id": 217, "partNo": "62498-L1400", "name": "BRKT ASSY-U/COVER MTG, E", "category": "FRT MBR", "tag": "BRKT", "w": 38.0, "d": 48.0, "h": 25.0, "mass": 0.028, "palletId": 7, "actual": 16000}, {"id": 218, "partNo": "624C5-P2000", "name": "BRKT ASSY-IMPACT,LH", "category": "FRT MBR", "tag": "BRKT IMPACT", "w": 266.0, "d": 90.0, "h": 78.0, "mass": 0.7024, "palletId": 7, "actual": 350}, {"id": 219, "partNo": "624D5-P2000", "name": "BRKT ASSY-IMPACT,RH", "category": "FRT MBR", "tag": "BRKT IMPACT", "w": 266.0, "d": 90.0, "h": 78.0, "mass": 0.7015, "palletId": 7, "actual": 350}, {"id": 220, "partNo": "65184-K5000", "name": "REINF-SIDE SILL INR,RH", "category": "S/SILL", "tag": "BRKT", "w": 937.0, "d": 33.3, "h": 35.0, "mass": 0.537, "palletId": 7, "actual": 1000}, {"id": 221, "partNo": "62430-GA000", "name": "CROSS MBR ASSY-NO.2", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 388.0, "d": 273.0, "h": 75.0, "mass": 3.446, "palletId": 3, "actual": 168}, {"id": 222, "partNo": "64717-P2000", "name": "BRKT ASSY-ENGINE MT'G RR, LH", "category": "F/APRON", "tag": "BRKT", "w": 293.9, "d": 234.7, "h": 75.8, "mass": 0.744, "palletId": 7, "actual": 250}, {"id": 223, "partNo": "64612-L5000", "name": "MEMBER-FR SIDE INR, LH", "category": "F/APRON", "tag": "MEMBER SIDE", "w": 800.0, "d": 154.2, "h": 217.4, "mass": 2.693, "palletId": 3, "actual": 250}, {"id": 224, "partNo": "64656-P2000", "name": "REINF-FR S/MBR RR LWR, LH", "category": "F/APRON", "tag": "BRKT", "w": 211.5, "d": 30.0, "h": 115.1, "mass": 0.29, "palletId": 7, "actual": 1000}, {"id": 225, "partNo": "64666-P2000", "name": "REINF-FR S/MBR RR LWR, RH", "category": "F/APRON", "tag": "BRKT", "w": 281.1, "d": 131.7, "h": 30.4, "mass": 0.291, "palletId": 7, "actual": 1000}, {"id": 226, "partNo": "64634-P4000", "name": "EXTN-FR SIDE MEMBER OTR, LH ", "category": "F/APRON", "tag": "BRKT", "w": 109.7, "d": 94.0, "h": 197.3, "mass": 0.165, "palletId": 7, "actual": 2800}, {"id": 227, "partNo": "645D5-P4000", "name": "BRKT ASSY-RSVR TANK MT'G FR, RH", "category": "F/APRON", "tag": "BRKT", "w": 61.9, "d": 40.9, "h": 25.1, "mass": 0.031, "palletId": 7, "actual": 10000}, {"id": 228, "partNo": "64617-L5000", "name": "BRKT ASSY-BATTERY TRAY LEG", "category": "F/APRON", "tag": "BRKT", "w": 133.5, "d": 44.8, "h": 156.3, "mass": 0.145, "palletId": 7, "actual": 1000}, {"id": 229, "partNo": "64711-L5000-1W", "name": "BRKT ASSY-BATTERY TRAY 1W", "category": "F/APRON", "tag": "BRKT", "w": 87.4, "d": 216.3, "h": 127.2, "mass": 0.341, "palletId": 7, "actual": 500}, {"id": 230, "partNo": "64812-L5000", "name": "SUPPORT-TRANSMISSION MT'G FR", "category": "F/APRON", "tag": "BRKT", "w": 100.2, "d": 52.5, "h": 42.8, "mass": 0.0563, "palletId": 7, "actual": 3500}, {"id": 231, "partNo": "64814-L5000", "name": "SUPPORT-T/M MT'G RR", "category": "F/APRON", "tag": "BRKT", "w": 100.3, "d": 72.9, "h": 32.1, "mass": 0.078, "palletId": 7, "actual": 3000}, {"id": 232, "partNo": "648A2-L5000", "name": "BRKT-H.E.C.U MT'G, UPR", "category": "F/APRON", "tag": "BRKT", "w": 47.0, "d": 81.0, "h": 138.0, "mass": 0.096, "palletId": 7, "actual": 4000}, {"id": 233, "partNo": "648B2-L5000", "name": "BRKT-H.E.C.U MT'G, LWR", "category": "F/APRON", "tag": "BRKT", "w": 47.0, "d": 53.0, "h": 102.0, "mass": 0.0684, "palletId": 7, "actual": 5000}, {"id": 234, "partNo": "64547-S2500", "name": "REINF ASSY-FNDR/APRON FR LWR, RH", "category": "F/APRON", "tag": "BRKT", "w": 262.8, "d": 160.0, "h": 129.1, "mass": 0.486, "palletId": 7, "actual": 400}, {"id": 235, "partNo": "55220-AR000S", "name": "ARM COMPL SUB-RR LWR, LH", "category": "ARM", "tag": "L/ARM RR(도장)", "w": 503.0, "d": 203.0, "h": 110.0, "mass": 2.694, "palletId": 3, "actual": 150}, {"id": 236, "partNo": "55221-AR000S", "name": "ARM COMPL SUB-RR LWR, RH", "category": "ARM", "tag": "L/ARM RR(도장)", "w": 503.0, "d": 203.0, "h": 110.0, "mass": 2.655, "palletId": 3, "actual": 150}, {"id": 237, "partNo": "65114-AR000", "name": "PNL-CTR FLOOR CTR", "category": "CTR FLR", "tag": "CTR FLR PNL", "w": 1240.0, "d": 552.0, "h": 320.0, "mass": 6.711, "palletId": 4, "actual": 120}, {"id": 238, "partNo": "652A6-AR000", "name": "REINF-FR STEP UPR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 97.0, "d": 75.0, "h": 16.0, "mass": 0.064, "palletId": 7, "actual": 3000}, {"id": 239, "partNo": "65218-AR000", "name": "BRKT-TRANSMISSION MTG, LH", "category": "CTR FLR", "tag": "BRKT", "w": 245.0, "d": 202.0, "h": 62.0, "mass": 0.656, "palletId": 7, "actual": 700}, {"id": 240, "partNo": "65228-AR000", "name": "BRKT-TRANSMISSION MTG, RH", "category": "CTR FLR", "tag": "BRKT", "w": 245.0, "d": 202.0, "h": 62.0, "mass": 0.654, "palletId": 7, "actual": 550}, {"id": 241, "partNo": "65274-AR000", "name": "MEMBER-TUNNEL SIDE, LH", "category": "CTR FLR", "tag": "TUNNEL SIDE", "w": 1053.0, "d": 144.0, "h": 95.0, "mass": 1.385, "palletId": 7, "actual": 300}, {"id": 242, "partNo": "65284-AR000", "name": "MEMBER-TUNNEL SIDE, RH", "category": "CTR FLR", "tag": "TUNNEL SIDE", "w": 1053.0, "d": 144.0, "h": 95.0, "mass": 1.428, "palletId": 7, "actual": 250}, {"id": 243, "partNo": "65236-AR000", "name": "MEMBER-CTR FLOOR RR CORSS, LH", "category": "CTR FLR", "tag": "BRKT", "w": 240.0, "d": 155.0, "h": 36.0, "mass": 0.408, "palletId": 7, "actual": 1000}, {"id": 244, "partNo": "65246-AR000", "name": "MEMBER-CTR FLOOR RR CORSS, RH", "category": "CTR FLR", "tag": "BRKT", "w": 240.0, "d": 155.0, "h": 36.0, "mass": 0.408, "palletId": 7, "actual": 1000}, {"id": 245, "partNo": "652G6-AR000", "name": "MEMBER-CTR FLOOR RR COR OTR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 266.0, "d": 155.0, "h": 47.0, "mass": 0.509, "palletId": 7, "actual": 450}, {"id": 246, "partNo": "652H6-AR000", "name": "MEMBER-CTR FLOOR RR COR OTR, RH", "category": "CTR FLR", "tag": "BRKT", "w": 266.0, "d": 155.0, "h": 47.0, "mass": 0.497, "palletId": 7, "actual": 450}, {"id": 247, "partNo": "65278-AR000", "name": "REINF-FR SEAT CRO/MBR INR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 76.0, "d": 74.0, "h": 27.0, "mass": 0.07, "palletId": 7, "actual": 3000}, {"id": 248, "partNo": "65158-AR000", "name": "REINF-FR SEAT FR OTR MTG, LH", "category": "CTR FLR", "tag": "BRKT", "w": 173.0, "d": 130.0, "h": 64.0, "mass": 0.186, "palletId": 7, "actual": 1300}, {"id": 249, "partNo": "65288-AR000", "name": "REINF-FR SEAT CRO/MBR INR, RH", "category": "CTR FLR", "tag": "BRKT", "w": 76.0, "d": 74.0, "h": 27.0, "mass": 0.07, "palletId": 7, "actual": 3000}, {"id": 250, "partNo": "65168-AR000", "name": "REINF-FR SEAT FR OTR MTG, RH", "category": "CTR FLR", "tag": "BRKT", "w": 173.0, "d": 130.0, "h": 64.0, "mass": 0.184, "palletId": 7, "actual": 1300}, {"id": 251, "partNo": "65219-AR000", "name": "REINF-CTR FLOOR S/MBR UPR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 236.0, "d": 231.0, "h": 66.0, "mass": 0.513, "palletId": 7, "actual": 400}, {"id": 252, "partNo": "65229-AR000", "name": "REINF-CTR FLOOR S/MBR UPR, RH", "category": "CTR FLR", "tag": "BRKT", "w": 236.0, "d": 231.0, "h": 66.0, "mass": 0.506, "palletId": 7, "actual": 400}, {"id": 253, "partNo": "65238-AR000", "name": "MEMBER-CTR FLOOR CROSS, LH", "category": "CTR FLR", "tag": "BRKT", "w": 260.0, "d": 106.0, "h": 94.0, "mass": 0.319, "palletId": 7, "actual": 1300}, {"id": 254, "partNo": "65248-AR000", "name": "MEMBER-CTR FLOOR CROSS, RH", "category": "CTR FLR", "tag": "BRKT", "w": 260.0, "d": 106.0, "h": 94.0, "mass": 0.322, "palletId": 7, "actual": 1300}, {"id": 255, "partNo": "651C4-AR000", "name": "BRKT-COWL CRO/BAR SUPR MTG, LH", "category": "CTR FLR", "tag": "BRKT", "w": 118.0, "d": 107.0, "h": 18.0, "mass": 0.103, "palletId": 7, "actual": 2000}, {"id": 256, "partNo": "651D4-AR000", "name": "BRKT-COWL CRO/BAR SUPR MTG, RH", "category": "CTR FLR", "tag": "BRKT", "w": 118.0, "d": 107.0, "h": 18.0, "mass": 0.103, "palletId": 7, "actual": 2000}, {"id": 257, "partNo": "65174-AR000", "name": "REINF-SIDE SILL INR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 73.0, "d": 49.0, "h": 151.0, "mass": 1.546, "palletId": 7, "actual": 300}, {"id": 258, "partNo": "65184-AR000", "name": "REINF-SIDE SILL INR, RH", "category": "CTR FLR", "tag": "BRKT", "w": 734.0, "d": 49.0, "h": 151.0, "mass": 1.534, "palletId": 7, "actual": 300}, {"id": 259, "partNo": "65156-IY000S", "name": "BRKT-ASSY FR SEAT RR OTR MTG, LH", "category": "CTR FLR", "tag": "BRKT", "w": 161.0, "d": 155.0, "h": 117.0, "mass": 0.43, "palletId": 7, "actual": 960}, {"id": 260, "partNo": "65166-IY000S", "name": "BRKT ASSY-FR SEAT RR OTR MTG, RH", "category": "CTR FLR", "tag": "BRKT", "w": 161.0, "d": 155.0, "h": 117.0, "mass": 0.429, "palletId": 7, "actual": 960}, {"id": 261, "partNo": "651E4-IY000", "name": "REINF-FR SEAT CROSS MBR SD, LH", "category": "CTR FLR", "tag": "BRKT", "w": 161.0, "d": 97.0, "h": 74.0, "mass": 0.256, "palletId": 7, "actual": 1500}, {"id": 262, "partNo": "651F4-IY000", "name": "REINF-FR SEAT CROSS MBR SD, RH", "category": "CTR FLR", "tag": "BRKT", "w": 161.0, "d": 97.0, "h": 74.0, "mass": 0.256, "palletId": 7, "actual": 1500}, {"id": 263, "partNo": "651N4-IY000", "name": "PATCH-CTR FLOOR REINF,LH", "category": "CTR FLR", "tag": "BRKT", "w": 239.0, "d": 104.0, "h": 27.0, "mass": 0.252, "palletId": 7, "actual": 1800}, {"id": 264, "partNo": "651P4-IY000", "name": "PATCH-CTR FLOOR REINF,RH", "category": "CTR FLR", "tag": "BRKT", "w": 239.0, "d": 104.0, "h": 27.0, "mass": 0.252, "palletId": 7, "actual": 1800}, {"id": 266, "partNo": "62420-AR000H", "name": "MBR ASSY-FR NO.1", "category": "FRT MBR", "tag": "NO.1 FRT", "w": 932.0, "d": 159.0, "h": 150.0, "mass": 3.721, "palletId": 3, "actual": 84}, {"id": 267, "partNo": "62430-AR000H", "name": "MBR ASSY-FR NO.2", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 731.0, "d": 276.0, "h": 90.0, "mass": 2.986, "palletId": 3, "actual": 112}, {"id": 268, "partNo": "62440-AR000H", "name": "MBR ASSY-FR SIDE LH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 873.0, "d": 216.0, "h": 132.0, "mass": 5.108, "palletId": 3, "actual": 84}, {"id": 269, "partNo": "62450-AR000H", "name": "MBR ASSY-FR SIDE RH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 873.0, "d": 216.0, "h": 132.0, "mass": 5.123, "palletId": 3, "actual": 84}, {"id": 270, "partNo": "62470-AR000H", "name": "ENGINE MTG,LH", "category": "FRT MBR", "tag": "ENGINE MTG", "w": 214.0, "d": 222.0, "h": 169.0, "mass": 2.031, "palletId": 7, "actual": 105}, {"id": 271, "partNo": "62480-AR000H", "name": "ENGINE MTG,RH", "category": "FRT MBR", "tag": "ENGINE MTG", "w": 214.0, "d": 222.0, "h": 169.0, "mass": 2.012, "palletId": 7, "actual": 105}, {"id": 272, "partNo": "62425-AR000H", "name": "FR BODY MTG,LH", "category": "FRT MBR", "tag": "BODY MTG", "w": 335.0, "d": 218.0, "h": 154.0, "mass": 1.801, "palletId": 7, "actual": 84}, {"id": 273, "partNo": "62435-AR000H", "name": "FR BODY MTG,RH", "category": "FRT MBR", "tag": "BODY MTG", "w": 335.0, "d": 197.0, "h": 153.0, "mass": 1.816, "palletId": 7, "actual": 84}, {"id": 274, "partNo": "62496-AR000", "name": "PIPE-BODY MT’G FR, LH", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 44.0, "d": 44.0, "h": 101.0, "mass": 0.871, "palletId": 7, "actual": 500}, {"id": 275, "partNo": "62497-AR000", "name": "PIPE-BODY MT’G FR, RH", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 44.0, "d": 44.0, "h": 101.0, "mass": 0.795, "palletId": 7, "actual": 500}, {"id": 276, "partNo": "62448-AR000", "name": "PIPE – G/BOX MTG", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 35.0, "d": 35.0, "h": 75.0, "mass": 0.188, "palletId": 7, "actual": 2450}, {"id": 277, "partNo": "55420-AR000H", "name": "MEMBER ASSY, NO1", "category": "RR MBR", "tag": "NO.1 RR", "w": 800.0, "d": 147.0, "h": 165.0, "mass": 4.818, "palletId": 3, "actual": 84}, {"id": 278, "partNo": "55430-AR000H", "name": "MEMBER ASSY, NO2", "category": "RR MBR", "tag": "NO.2 RR", "w": 811.0, "d": 275.0, "h": 155.0, "mass": 5.717, "palletId": 3, "actual": 42}, {"id": 279, "partNo": "55440-AR050H", "name": "MAIN MBR ASSY-SIDE, LH", "category": "RR MBR", "tag": "SIDE RR", "w": 670.0, "d": 339.0, "h": 254.0, "mass": 5.956, "palletId": 3, "actual": 56}, {"id": 280, "partNo": "55450-AR050H", "name": "MAIN MBR ASSY-SIDE, RH", "category": "RR MBR", "tag": "SIDE RR", "w": 670.0, "d": 339.0, "h": 254.0, "mass": 5.963, "palletId": 3, "actual": 56}, {"id": 281, "partNo": "55470-AR000H", "name": "CTR REINF, LH", "category": "RR MBR", "tag": "BRKT", "w": 141.0, "d": 266.0, "h": 58.0, "mass": 0.254, "palletId": 7, "actual": 1500}, {"id": 282, "partNo": "55475-AR000H", "name": "CTR REINF, RH", "category": "RR MBR", "tag": "BRKT", "w": 141.0, "d": 266.0, "h": 58.0, "mass": 0.249, "palletId": 7, "actual": 1500}, {"id": 283, "partNo": "55465-AR000H", "name": "A/ARM MTG BRKT, LH", "category": "RR MBR", "tag": "BRKT", "w": 225.0, "d": 150.0, "h": 129.0, "mass": 0.39, "palletId": 7, "actual": 1120}, {"id": 284, "partNo": "55466-AR000H", "name": "A/ARM MTG BRKT, RH", "category": "RR MBR", "tag": "BRKT", "w": 225.0, "d": 150.0, "h": 129.0, "mass": 0.388, "palletId": 7, "actual": 1120}, {"id": 285, "partNo": "55485-AR000H", "name": "STOPPER-LWR, FR", "category": "RR MBR", "tag": "STOPPER", "w": 100.0, "d": 102.0, "h": 15.0, "mass": 0.178, "palletId": 7, "actual": 1120}, {"id": 286, "partNo": "55486-AR000H", "name": "STOPPER-LWR, RR", "category": "RR MBR", "tag": "STOPPER", "w": 116.0, "d": 116.0, "h": 16.0, "mass": 0.239, "palletId": 7, "actual": 1080}, {"id": 287, "partNo": "55460-AR000H", "name": "RAIL", "category": "RR MBR", "tag": "RAIL", "w": 317.0, "d": 55.0, "h": 29.0, "mass": 0.309, "palletId": 7, "actual": 1020}, {"id": 288, "partNo": "21762-B1100", "name": "BUSH-DIFF MTG, FR", "category": "RR MBR", "tag": "BUSH", "w": 70.0, "d": 47.0, "h": 71.0, "mass": 0.221, "palletId": 7, "actual": 1540}, {"id": 289, "partNo": "21773-T6100", "name": "BUSH-DIFF MTG-RR, LH", "category": "RR MBR", "tag": "BUSH", "w": 80.0, "d": 81.0, "h": 74.0, "mass": 0.503, "palletId": 7, "actual": 780}, {"id": 290, "partNo": "21772-J5100", "name": "BUSH-DIFF MTG-RR, RH", "category": "RR MBR", "tag": "BUSH", "w": 80.0, "d": 81.0, "h": 73.0, "mass": 0.467, "palletId": 7, "actual": 780}, {"id": 291, "partNo": "21772-J5200", "name": "BUSH-DIFF MTG-RR, RH", "category": "RR MBR", "tag": "BUSH", "w": 80.0, "d": 81.0, "h": 73.0, "mass": 0.462, "palletId": 7, "actual": 780}, {"id": 292, "partNo": "55113-3Q000", "name": "PIPE", "category": "ARM", "tag": "PIPE", "w": 45.5, "d": 45.5, "h": 28.0, "mass": 0.09, "palletId": 7, "actual": 5200}, {"id": 293, "partNo": "55260-P2000CA", "name": "ARM ASSY-ASSIST,RR (도장)", "category": "ARM", "tag": "A/ARM RR(도장)", "w": 295.0, "d": 50.0, "h": 30.0, "mass": 0.565, "palletId": 5, "actual": 532}, {"id": 294, "partNo": "55260-S1000CA", "name": "ARM-RR ASSIST", "category": "ARM", "tag": "A/ARM RR(도장)", "w": 305.9, "d": 50.0, "h": 30.0, "mass": 0.569, "palletId": 5, "actual": 532}, {"id": 295, "partNo": "62461-AA000", "name": "BRKT ASSY-ROLL ROD MT'G", "category": "FRT MBR", "tag": "ROLL MTG", "w": 138.0, "d": 89.2, "h": 63.3, "mass": 0.382, "palletId": 7, "actual": 650}, {"id": 296, "partNo": "55260-L3500CA", "name": "ARM ASSY-RR ASSIST", "category": "ARM", "tag": "A/ARM RR(도장)", "w": 323.5, "d": 62.7, "h": 55.8, "mass": 0.536, "palletId": 7, "actual": 448}, {"id": 297, "partNo": "55125-CW000CA", "name": "ARM ASSY-RR UPR ARM", "category": "ARM", "tag": "A/ARM RR(도장)", "w": 371.5, "d": 152.7, "h": 20.0, "mass": 0.931, "palletId": 7, "actual": 360}, {"id": 298, "partNo": "55110-C5050W", "name": "ARM ASS'Y-RR UPR(방청)", "category": "ARM", "tag": "U/ARM RR", "w": 348.0, "d": 96.0, "h": 38.0, "mass": 0.756, "palletId": 3, "actual": 1080}, {"id": 299, "partNo": "55260-L0000CA", "name": "ARM ASSY-RR ASSIST", "category": "ARM", "tag": "A/ARM RR(도장)", "w": 359.0, "d": 69.0, "h": 63.0, "mass": 0.658, "palletId": 3, "actual": 336}, {"id": 300, "partNo": "55125-L0000", "name": "ARM ASSY-RR UPR", "category": "ARM", "tag": "U/ARM RR", "w": 373.0, "d": 146.0, "h": 32.0, "mass": 0.9954, "palletId": 7, "actual": 270}, {"id": 301, "partNo": "55125-P2000W", "name": "LARM ASSY-RR UPR(방청)", "category": "ARM", "tag": "U/ARM RR", "w": 369.1, "d": 133.1, "h": 37.3, "mass": 0.977, "palletId": 7, "actual": 1000}, {"id": 304, "partNo": "64458-P6000", "name": "BHD-FNDR/APRON UPR FR, LH", "category": "F/APRON", "tag": "BRKT", "w": 70.0, "d": 70.0, "h": 32.0, "mass": 0.126, "palletId": 7, "actual": 3000}, {"id": 305, "partNo": "64468-P6000", "name": "BHD-FNDR/APRON UPR FR, RH", "category": "F/APRON", "tag": "BRKT", "w": 70.0, "d": 70.0, "h": 32.0, "mass": 0.125, "palletId": 7, "actual": 3000}, {"id": 306, "partNo": "64818-P6000", "name": "BRKT-FENDER UPR RR MT'G, LH", "category": "F/APRON", "tag": "BRKT", "w": 251.0, "d": 213.0, "h": 69.0, "mass": 0.331, "palletId": 7, "actual": 1000}, {"id": 307, "partNo": "64828-P6000", "name": "BRKT-FENDER UPR RR MT'G, RH", "category": "F/APRON", "tag": "BRKT", "w": 251.0, "d": 213.0, "h": 69.0, "mass": 0.332, "palletId": 7, "actual": 1000}, {"id": 308, "partNo": "64494-P6000", "name": "BRKT-FENDER MT'G UPR FR ,LH", "category": "F/APRON", "tag": "BRKT", "w": 112.0, "d": 68.0, "h": 43.0, "mass": 0.063, "palletId": 7, "actual": 7200}, {"id": 309, "partNo": "64496-P6000", "name": "BRKT-FENDER FR UPR MTG,RH", "category": "F/APRON", "tag": "BRKT", "w": 112.0, "d": 68.0, "h": 43.0, "mass": 0.061, "palletId": 7, "actual": 7200}, {"id": 310, "partNo": "64578-P6000", "name": "BRKT-FENDER MTG,LH", "category": "F/APRON", "tag": "BRKT", "w": 130.0, "d": 96.0, "h": 66.0, "mass": 0.069, "palletId": 3, "actual": 6000}, {"id": 311, "partNo": "64588-P6000", "name": "BRKT-FENDER MTG,RH", "category": "F/APRON", "tag": "BRKT", "w": 130.0, "d": 96.0, "h": 66.0, "mass": 0.069, "palletId": 7, "actual": 6000}, {"id": 312, "partNo": "64772-P6000", "name": "REINF FENDER MTG LWR, LH", "category": "F/APRON", "tag": "BRKT", "w": 89.0, "d": 97.0, "h": 35.0, "mass": 0.06, "palletId": 7, "actual": 7500}, {"id": 313, "partNo": "64782-P6000", "name": "REINF FENDER MTG LWR, RH", "category": "F/APRON", "tag": "BRKT", "w": 89.0, "d": 97.0, "h": 35.0, "mass": 0.06, "palletId": 3, "actual": 7500}, {"id": 317, "partNo": "62420-DO000", "name": "MEMBER ASSY-NO.1", "category": "FRT MBR", "tag": "NO.1 FRT", "w": 942.0, "d": 206.0, "h": 155.0, "mass": 5.064, "palletId": 3, "actual": 70}, {"id": 318, "partNo": "62420-DO100", "name": "MEMBER ASSY-NO.1", "category": "FRT MBR", "tag": "NO.1 FRT", "w": 942.0, "d": 121.0, "h": 155.0, "mass": 5.267, "palletId": 3, "actual": 70}, {"id": 319, "partNo": "62440-XA000", "name": " MEMBER ASSY-SIDE, LH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 842.0, "d": 291.0, "h": 107.0, "mass": 6.326, "palletId": 7, "actual": 70}, {"id": 320, "partNo": "62450-XA000", "name": " MEMBER ASSY-SIDE, RH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 842.0, "d": 291.0, "h": 107.0, "mass": 6.334, "palletId": 3, "actual": 70}, {"id": 321, "partNo": "62425-DO000", "name": "PNL SUB ASSY-UPR NO.1", "category": "FRT MBR", "tag": "NO.1 PNL", "w": 942.0, "d": 121.0, "h": 139.0, "mass": 2.383, "palletId": 3, "actual": 150}, {"id": 322, "partNo": "62425-DO100", "name": "PNL SUB ASSY-UPR NO.1", "category": "FRT MBR", "tag": "NO.1 PNL", "w": 942.0, "d": 121.0, "h": 139.0, "mass": 2.366, "palletId": 3, "actual": 150}, {"id": 323, "partNo": "62427-DO000", "name": " PNL-LWR NO.1", "category": "FRT MBR", "tag": "NO.1 PNL", "w": 540.0, "d": 111.0, "h": 48.0, "mass": 1.137, "palletId": 3, "actual": 300}, {"id": 324, "partNo": "62444-DO000", "name": " PNL SUB ASSY-SIDE UPR, LH", "category": "FRT MBR", "tag": "SIDE PNL", "w": 841.0, "d": 262.0, "h": 87.0, "mass": 2.136, "palletId": 3, "actual": 180}, {"id": 325, "partNo": "62454-DO000", "name": " PNL SUB ASSY-SIDE UPR, RH", "category": "FRT MBR", "tag": "SIDE PNL", "w": 841.0, "d": 262.0, "h": 87.0, "mass": 2.138, "palletId": 3, "actual": 180}, {"id": 326, "partNo": "62447-DO000", "name": " PNL-SIDE LWR, LH", "category": "FRT MBR", "tag": "SIDE PNL", "w": 840.0, "d": 259.0, "h": 63.0, "mass": 2.229, "palletId": 3, "actual": 180}, {"id": 327, "partNo": "62457-DO000", "name": " PNL-SIDE LWR, RH", "category": "FRT MBR", "tag": "SIDE PNL", "w": 840.0, "d": 259.0, "h": 63.0, "mass": 2.229, "palletId": 7, "actual": 180}, {"id": 328, "partNo": "62428-GI000", "name": " BRKT ASSY-E.W.P MT'G, LH", "category": "FRT MBR", "tag": "BRKT", "w": 67.0, "d": 20.0, "h": 37.0, "mass": 0.048, "palletId": 3, "actual": 250}, {"id": 329, "partNo": "62429-GI000", "name": " BRKT ASSY-E.W.P MT'G, RH", "category": "FRT MBR", "tag": "BRKT", "w": 49.0, "d": 51.0, "h": 36.0, "mass": 0.048, "palletId": 7, "actual": 200}, {"id": 330, "partNo": "624A1-GI000", "name": " BRKT ASSY-COMPRESSOR MT'G FR", "category": "FRT MBR", "tag": "BRKT", "w": 60.0, "d": 54.0, "h": 32.0, "mass": 0.075, "palletId": 7, "actual": 140}, {"id": 331, "partNo": "624A3-GI000", "name": "BRKT ASSY-COMPRESSOR MT'G RR", "category": "FRT MBR", "tag": "BRKT", "w": 59.0, "d": 78.0, "h": 37.0, "mass": 0.114, "palletId": 7, "actual": 3360}, {"id": 332, "partNo": "624A5-GI000", "name": "BRKT ASSY-BATTERY HEATER MT'G", "category": "FRT MBR", "tag": "BRKT", "w": 30.0, "d": 33.0, "h": 31.0, "mass": 0.03, "palletId": 7, "actual": 400}, {"id": 333, "partNo": "624C1-DO000", "name": "BRKT-CTR BODY MTG REINF", "category": "FRT MBR", "tag": "BRKT", "w": 63.0, "d": 65.0, "h": 33.0, "mass": 0.057, "palletId": 7, "actual": 7500}, {"id": 334, "partNo": "624A7-GI000", "name": "BRKT-PE MTG REINF, RH", "category": "FRT MBR", "tag": "BRKT", "w": 111.0, "d": 111.0, "h": 5.0, "mass": 0.153, "palletId": 7, "actual": 3060}, {"id": 335, "partNo": "624B1-GI000", "name": "BRKT-PE REINF", "category": "FRT MBR", "tag": "BRKT", "w": 102.0, "d": 78.0, "h": 50.0, "mass": 0.171, "palletId": 7, "actual": 1600}, {"id": 336, "partNo": "624A8-GI000", "name": "BRKT ASSY-E.W.P MT'G, LWR", "category": "FRT MBR", "tag": "BRKT", "w": 56.0, "d": 108.0, "h": 17.0, "mass": 0.101, "palletId": 7, "actual": 4600}, {"id": 337, "partNo": "62423-DO000", "name": " REINF-BODY MT'G, LH", "category": "FRT MBR", "tag": "BRKT", "w": 129.0, "d": 101.0, "h": 121.0, "mass": 0.3, "palletId": 7, "actual": 1500}, {"id": 338, "partNo": "62424-DO000", "name": " REINF-BODY MT'G, RH", "category": "FRT MBR", "tag": "BRKT", "w": 129.0, "d": 101.0, "h": 121.0, "mass": 0.301, "palletId": 7, "actual": 1500}, {"id": 339, "partNo": "62491-GI000", "name": " PIPE-CTR BODY MT'G, LH", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 34.0, "d": 33.0, "h": 57.0, "mass": 0.229, "palletId": 3, "actual": 70}, {"id": 340, "partNo": "62492-GI000", "name": " PIPE-CTR BODY MT'G, RH", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 34.0, "d": 34.0, "h": 57.0, "mass": 0.184, "palletId": 7, "actual": 70}, {"id": 341, "partNo": "62494-CU000", "name": "PIPE-RR BODY MT'G", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 48.0, "d": 48.0, "h": 57.0, "mass": 0.345, "palletId": 7, "actual": 1360}, {"id": 342, "partNo": "62493-GI000", "name": "PIPE NUT-PE MTG(M12X1.25)", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 33.0, "d": 33.0, "h": 64.0, "mass": 0.156, "palletId": 7, "actual": 2870}, {"id": 343, "partNo": "62430-DO000", "name": " MEMBER ASSY-NO.2", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 607.0, "d": 108.0, "h": 161.0, "mass": 2.789, "palletId": 7, "actual": 160}, {"id": 344, "partNo": "62436-KL050", "name": " PNL-FR NO.2", "category": "FRT MBR", "tag": "NO.2 PNL", "w": 563.0, "d": 65.0, "h": 161.0, "mass": 1.294, "palletId": 7, "actual": 150}, {"id": 345, "partNo": "62435-DO000", "name": " PNL-ASSY RR NO.2", "category": "FRT MBR", "tag": "NO.2 PNL", "w": 607.0, "d": 67.0, "h": 157.0, "mass": 1.495, "palletId": 7, "actual": 140}, {"id": 346, "partNo": "62443-DO000", "name": " BRKT ASSY-A MT'G, LH", "category": "FRT MBR", "tag": "BRKT", "w": 122.0, "d": 196.0, "h": 96.0, "mass": 0.545, "palletId": 7, "actual": 360}, {"id": 347, "partNo": "62453-DO000", "name": " BRKT ASSY-A MT'G, RH", "category": "FRT MBR", "tag": "BRKT", "w": 122.0, "d": 196.0, "h": 96.0, "mass": 0.545, "palletId": 7, "actual": 360}, {"id": 348, "partNo": "62498-GI000", "name": " BRKT ASSY-U/COVER MT'G, FR", "category": "FRT MBR", "tag": "BRKT", "w": 42.0, "d": 38.0, "h": 33.0, "mass": 0.03, "palletId": 7, "actual": 16000}, {"id": 349, "partNo": "62448-DO000", "name": " BRKT-SIDE REINF, LH", "category": "FRT MBR", "tag": "BRKT", "w": 214.0, "d": 57.0, "h": 72.0, "mass": 0.447, "palletId": 7, "actual": 1000}, {"id": 350, "partNo": "62458-DO000", "name": " BRKT-SIDE REINF, RH", "category": "FRT MBR", "tag": "BRKT", "w": 214.0, "d": 57.0, "h": 72.0, "mass": 0.447, "palletId": 7, "actual": 1000}, {"id": 351, "partNo": "62449-DO000", "name": " BRKT-IMPACT REINF, LH", "category": "FRT MBR", "tag": "BRKT", "w": 159.0, "d": 186.0, "h": 16.0, "mass": 0.564, "palletId": 7, "actual": 850}, {"id": 352, "partNo": "62459-DO000", "name": " BRKT-IMPACT REINF, RH", "category": "FRT MBR", "tag": "BRKT", "w": 159.0, "d": 186.0, "h": 16.0, "mass": 0.57, "palletId": 7, "actual": 850}, {"id": 353, "partNo": "62483-GI000", "name": " BRKT ASSY-FR PE MTG, LH ", "category": "FRT MBR", "tag": "BRKT", "w": 51.0, "d": 107.0, "h": 129.0, "mass": 0.45, "palletId": 7, "actual": 920}, {"id": 354, "partNo": "62484-GI000", "name": " BRKT ASSY-FR PE MTG, RH ", "category": "FRT MBR", "tag": "BRKT", "w": 51.0, "d": 107.0, "h": 129.0, "mass": 0.43, "palletId": 7, "actual": 920}, {"id": 355, "partNo": "62488-DO000", "name": " BRKT ASSY-RR PE MT'G, LH ", "category": "FRT MBR", "tag": "BRKT", "w": 75.0, "d": 121.0, "h": 151.0, "mass": 0.486, "palletId": 7, "actual": 580}, {"id": 356, "partNo": "62489-DO000", "name": " BRKT ASSY-RR PE MT'G, RH ", "category": "FRT MBR", "tag": "BRKT", "w": 71.0, "d": 122.0, "h": 140.0, "mass": 0.435, "palletId": 7, "actual": 650}, {"id": 357, "partNo": "62460-DO100", "name": " BRKT ASSY-IMPACT B, LH", "category": "FRT MBR", "tag": "BRKT", "w": 217.0, "d": 248.0, "h": 109.0, "mass": 1.775, "palletId": 7, "actual": 128}, {"id": 358, "partNo": "62461-DO100", "name": " BRKT ASSY-IMPACT B, RH", "category": "FRT MBR", "tag": "BRKT", "w": 217.0, "d": 248.0, "h": 109.0, "mass": 1.774, "palletId": 7, "actual": 128}, {"id": 359, "partNo": "62476-GI000", "name": " REINF-SIDE MBR, LH", "category": "FRT MBR", "tag": "BRKT", "w": 103.0, "d": 156.0, "h": 51.0, "mass": 0.287, "palletId": 7, "actual": 960}, {"id": 360, "partNo": "62477-GI000", "name": " REINF ASSY-SIDE MBR, RH", "category": "FRT MBR", "tag": "BRKT", "w": 103.0, "d": 156.0, "h": 53.0, "mass": 0.294, "palletId": 7, "actual": 960}, {"id": 361, "partNo": "62480-GI000", "name": " BRKT ASSY-PE MTG, RH", "category": "FRT MBR", "tag": "BRKT", "w": 95.0, "d": 137.0, "h": 114.0, "mass": 0.665, "palletId": 7, "actual": 360}, {"id": 362, "partNo": "62474-GI000", "name": "BRKT ASSY-UNDER BAR", "category": "FRT MBR", "tag": "BAR", "w": 657.0, "d": 54.0, "h": 11.0, "mass": 0.517, "palletId": 7, "actual": 900}, {"id": 363, "partNo": "62470-DO000", "name": " BRKT ASSY-S/BAR, LH", "category": "FRT MBR", "tag": "BRKT", "w": 64.0, "d": 45.0, "h": 127.0, "mass": 0.23, "palletId": 4, "actual": 1920}, {"id": 364, "partNo": "62471-DO000", "name": " BRKT ASSY-S/BAR, RH", "category": "FRT MBR", "tag": "BRKT", "w": 64.0, "d": 42.0, "h": 127.0, "mass": 0.224, "palletId": 7, "actual": 1920}, {"id": 365, "partNo": "624B2-DO200", "name": "BRKT-EXT. REINF, LH", "category": "FRT MBR", "tag": "BRKT", "w": 248.0, "d": 41.0, "h": 91.0, "mass": 0.77, "palletId": 7, "actual": 600}, {"id": 366, "partNo": "624B3-DO200", "name": "BRKT-EXT. REINF, RH", "category": "FRT MBR", "tag": "BRKT", "w": 248.0, "d": 41.0, "h": 91.0, "mass": 0.77, "palletId": 7, "actual": 600}, {"id": 367, "partNo": "624E5-GI000S", "name": " BAR FR-CROSS MEMEBER", "category": "FRT MBR", "tag": "BAR", "w": 1264.0, "d": 99.0, "h": 26.0, "mass": 0, "palletId": 4, "actual": 300}, {"id": 368, "partNo": "62419-GI000", "name": "BOLT-FLANGE, M14", "category": "H/W", "tag": "H/W", "w": 28.0, "d": 28.0, "h": 84.0, "mass": 0.121, "palletId": 7, "actual": 3500}, {"id": 369, "partNo": "54561-CU000", "name": " BOLT-FLANGE (G), M14", "category": "H/W", "tag": "H/W", "w": 28.0, "d": 28.0, "h": 119.0, "mass": 0.168, "palletId": 7, "actual": 2800}, {"id": 370, "partNo": "62497-GI000", "name": "PIPE NUT-G/BOX MT’G\n(M12X1.25)", "category": "PIPE NUT", "tag": "PIPE NUT", "w": 36.0, "d": 36.0, "h": 90.0, "mass": 0.241, "palletId": 7, "actual": 1850}, {"id": 371, "partNo": "55424-XA000", "name": "PIPE-PE MT'G-FRT", "category": "RR MBR", "tag": "PIPE", "w": 86.0, "d": 86.0, "h": 67.0, "mass": 0.407, "palletId": 4, "actual": 1102}, {"id": 372, "partNo": "55425-XA000", "name": "REINF-NO.1, UPR", "category": "RR MBR", "tag": "BRKT", "w": 90.0, "d": 61.0, "h": 22.0, "mass": 0.089, "palletId": 4, "actual": 4800}, {"id": 373, "partNo": "55426-XA000", "name": "REINF-NO.1, LH", "category": "RR MBR", "tag": "BRKT", "w": 21.0, "d": 41.0, "h": 86.0, "mass": 0.088, "palletId": 7, "actual": 5400}, {"id": 374, "partNo": "55427-XA000", "name": "REINF-NO.1, RH", "category": "RR MBR", "tag": "BRKT", "w": 21.0, "d": 41.0, "h": 91.0, "mass": 0.094, "palletId": 7, "actual": 5100}, {"id": 375, "partNo": "55444-XA000", "name": "CUP-BODY MT'G-FR", "category": "RR MBR", "tag": "CUP", "w": 86.0, "d": 86.0, "h": 69.0, "mass": 0.407, "palletId": 7, "actual": 1102}, {"id": 376, "partNo": "55444-XA100", "name": "CUP-BODY MT'G-RR", "category": "RR MBR", "tag": "CUP", "w": 91.0, "d": 91.0, "h": 69.0, "mass": 0.432, "palletId": 3, "actual": 960}, {"id": 377, "partNo": "55499-XA000", "name": "BRKT ASSY-RAIL MT'G FR, LH", "category": "RR MBR", "tag": "BRKT", "w": 40.0, "d": 46.0, "h": 63.0, "mass": 0.104, "palletId": 7, "actual": 4550}, {"id": 378, "partNo": "55449-XA000", "name": "BRKT-PEM WIRING MT'G, A", "category": "RR MBR", "tag": "BRKT", "w": 48.0, "d": 26.0, "h": 31.0, "mass": 0.039, "palletId": 7, "actual": 12000}, {"id": 379, "partNo": "55499-XA500", "name": "BRKT ASSY-RAIL MT'G FR, RH", "category": "RR MBR", "tag": "BRKT", "w": 40.0, "d": 46.0, "h": 63.0, "mass": 0.104, "palletId": 7, "actual": 4550}, {"id": 380, "partNo": "55454-XA000", "name": "BRKT-OIL COOLER HOSE MT'G", "category": "RR MBR", "tag": "BRKT", "w": 42.0, "d": 25.0, "h": 2.0, "mass": 0.015, "palletId": 7, "actual": 800}, {"id": 381, "partNo": "55401-XA000", "name": "BRKT-ASSY PE MT'G RR A, RH", "category": "RR MBR", "tag": "BRKT", "w": 50.0, "d": 153.0, "h": 105.0, "mass": 0.421, "palletId": 7, "actual": 1000}, {"id": 382, "partNo": "55401-XA500", "name": "BRKT-ASSY PE MT'G RR B, LH", "category": "RR MBR", "tag": "BRKT", "w": 50.0, "d": 88.0, "h": 121.0, "mass": 0.329, "palletId": 7, "actual": 1000}, {"id": 383, "partNo": "55428-XA000", "name": "BRKT-ASSY STAB BAR MT'G, LH ", "category": "RR MBR", "tag": "BRKT", "w": 93.0, "d": 123.0, "h": 34.0, "mass": 0.261, "palletId": 7, "actual": 1850}, {"id": 384, "partNo": "55429-XA000", "name": "BRKT-ASSY STAB BAR MT'G, RH ", "category": "RR MBR", "tag": "BRKT", "w": 93.0, "d": 123.0, "h": 34.0, "mass": 0.261, "palletId": 3, "actual": 1850}, {"id": 385, "partNo": "55490-XA000", "name": "BRKT ASSY-U/COVER MTG, A", "category": "RR MBR", "tag": "BRKT", "w": 85.0, "d": 24.0, "h": 32.0, "mass": 0.051, "palletId": 3, "actual": 9500}, {"id": 386, "partNo": "55491-XA000", "name": "BRKT ASSY-U/COVER MTG, B", "category": "RR MBR", "tag": "BRKT", "w": 103.0, "d": 72.0, "h": 128.0, "mass": 0.22, "palletId": 7, "actual": 1500}, {"id": 387, "partNo": "55492-XA000", "name": "BRKT ASSY-U/COVER MTG, C", "category": "RR MBR", "tag": "BRKT", "w": 46.0, "d": 103.0, "h": 117.0, "mass": 0.188, "palletId": 7, "actual": 2500}, {"id": 388, "partNo": "55494-XA000", "name": "BRKT ASSY-CABLE MT'G", "category": "RR MBR", "tag": "BRKT", "w": 24.0, "d": 37.0, "h": 7.0, "mass": 0.019, "palletId": 7, "actual": 800}, {"id": 389, "partNo": "55498-XA000", "name": "BRKT-PEM MT'G", "category": "RR MBR", "tag": "BRKT", "w": 76.0, "d": 11.0, "h": 22.0, "mass": 0.022, "palletId": 7, "actual": 500}, {"id": 390, "partNo": "55485-XA000", "name": "STOPPER-LWR, FR(도장)", "category": "RR MBR", "tag": "STOPPER", "w": 96.0, "d": 96.0, "h": 17.0, "mass": 0.17, "palletId": 7, "actual": 2790}, {"id": 391, "partNo": "55485-XA100", "name": "STOPPER-LWR, RR(도장)", "category": "RR MBR", "tag": "STOPPER", "w": 96.0, "d": 96.0, "h": 15.0, "mass": 0.168, "palletId": 7, "actual": 2790}, {"id": 392, "partNo": "55460-XA000", "name": "RAIL(도장)", "category": "RR MBR", "tag": "RAIL", "w": 54.0, "d": 286.0, "h": 44.0, "mass": 0.286, "palletId": 7, "actual": 1640}, {"id": 393, "partNo": "55495-XA000", "name": "BAR-RR CROSS MEMBER(도장)", "category": "RR MBR", "tag": "BAR", "w": 468.0, "d": 68.0, "h": 24.0, "mass": 0.97, "palletId": 7, "actual": 520}, {"id": 394, "partNo": "55496-XA000\n65415-XA000", "name": "BRKT ASSY-U/COVER MTG, LH(도장)", "category": "RR MBR", "tag": "BRKT", "w": 80.0, "d": 45.0, "h": 13.0, "mass": 0.073, "palletId": 7, "actual": 6400}, {"id": 395, "partNo": "55497-XA000\n65425-XA000", "name": "BRKT ASSY-U/COVER MTG, RH(도장)", "category": "RR MBR", "tag": "BRKT", "w": 80.0, "d": 45.0, "h": 13.0, "mass": 0.073, "palletId": 7, "actual": 6400}, {"id": 396, "partNo": "11406-10206K", "name": "BOLT-FLANGE", "category": "H/W", "tag": "H/W", "w": 19.0, "d": 19.0, "h": 31.0, "mass": 0.027, "palletId": 7, "actual": 19800}, {"id": 397, "partNo": "11406-12256K", "name": "BOLT-FLANGE", "category": "H/W", "tag": "H/W", "w": 23.0, "d": 23.0, "h": 37.0, "mass": 0.046, "palletId": 7, "actual": 11100}, {"id": 398, "partNo": "13386-10007K", "name": "NUT-FLANGE", "category": "H/W", "tag": "H/W", "w": 20.0, "d": 20.0, "h": 11.0, "mass": 0.011, "palletId": 7, "actual": 42000}, {"id": 399, "partNo": "55125-XA000", "name": "ARM ASSY-RR UPR FR", "category": "ARM", "tag": "U/ARM FRT", "w": 332.0, "d": 30.0, "h": 83.0, "mass": 1.038, "palletId": 7, "actual": 400}, {"id": 400, "partNo": "55135-XA000", "name": "ARM ASSY-RR UPR RR, LH", "category": "ARM", "tag": "U/ARM RR", "w": 442.0, "d": 30.0, "h": 143.0, "mass": 1.316, "palletId": 3, "actual": 300}, {"id": 401, "partNo": "55136-XA000", "name": "ARM ASSY-RR UPR RR, RH", "category": "ARM", "tag": "U/ARM RR", "w": 442.0, "d": 30.0, "h": 143.0, "mass": 1.316, "palletId": 3, "actual": 300}, {"id": 402, "partNo": "55260-XA000", "name": "ARM ASSY-RR ASSIST", "category": "ARM", "tag": "A/ARM RR", "w": 561.0, "d": 26.0, "h": 73.0, "mass": 0.957, "palletId": 3, "actual": 418}, {"id": 403, "partNo": "55280-XA000", "name": "ARM ASSY-RR TRAILING", "category": "ARM", "tag": "T/ARM RR", "w": 402.0, "d": 68.0, "h": 76.0, "mass": 0.872, "palletId": 3, "actual": 350}, {"id": 405, "partNo": "62420-GI000", "name": "MEMBER ASSY-NO.1 2WD", "category": "FRT MBR", "tag": "NO.1 FRT", "w": 951.9, "d": 435.0, "h": 89.0, "mass": 4.901, "palletId": 3, "actual": 70}, {"id": 406, "partNo": "62420-GI100S", "name": "MEMBER ASSY-NO.1 AWD", "category": "FRT MBR", "tag": "NO.1 FRT", "w": 937.2, "d": 135.8, "h": 185.6, "mass": 6.085, "palletId": 7, "actual": 70}, {"id": 407, "partNo": "62430-KL050", "name": "MEMBER ASSY-NO.2", "category": "FRT MBR", "tag": "NO.2 FRT", "w": 606.3, "d": 107.7, "h": 161.0, "mass": 2.776, "palletId": 7, "actual": 160}, {"id": 408, "partNo": "62440-KL050EX", "name": "MEMBER ASSY-SIDE, LH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 838.6, "d": 264.0, "h": 98.3, "mass": 5.718, "palletId": 7, "actual": 72}, {"id": 409, "partNo": "62450-KL050EX", "name": "MEMBER ASSY-SIDE, RH", "category": "FRT MBR", "tag": "SIDE FRT", "w": 838.6, "d": 264.0, "h": 98.3, "mass": 5.743, "palletId": 7, "actual": 72}, {"id": 410, "partNo": "62460-GI200", "name": "BRKT ASSY-IMPACT B, LH", "category": "FRT MBR", "tag": "BRKT IMPACT", "w": 247.2, "d": 216.1, "h": 98.3, "mass": 1.731, "palletId": 7, "actual": 144}, {"id": 411, "partNo": "62461-GI200", "name": "BRKT ASSY-IMPACT B, RH", "category": "FRT MBR", "tag": "BRKT IMPACT", "w": 247.2, "d": 216.1, "h": 98.3, "mass": 1.728, "palletId": 7, "actual": 144}, {"id": 412, "partNo": "62470-GI000", "name": "BRKT ASSY-S/BAR, LH", "category": "FRT MBR", "tag": "BRKT", "w": 113.8, "d": 60.0, "h": 38.5, "mass": 0.196, "palletId": 7, "actual": 2080}, {"id": 413, "partNo": "62471-GI000", "name": "BRKT ASSY-S/BAR, RH", "category": "FRT MBR", "tag": "BRKT", "w": 113.8, "d": 60.0, "h": 38.5, "mass": 0.19, "palletId": 7, "actual": 2080}, {"id": 414, "partNo": "62474-NI000", "name": "BRKT ASSY-UNDER BAR", "category": "FRT MBR", "tag": "BAR", "w": 640.0, "d": 53.6, "h": 10.5, "mass": 0.852, "palletId": 7, "actual": 500}, {"id": 415, "partNo": "62488-GI000", "name": "BRKT ASSY-RR PE MTG, LH", "category": "FRT MBR", "tag": "BRKT", "w": 121.0, "d": 150.7, "h": 75.0, "mass": 0.904, "palletId": 3, "actual": 480}, {"id": 416, "partNo": "62489-GI000", "name": "BRKT ASSY-RR PE MTG, RH", "category": "FRT MBR", "tag": "BRKT", "w": 121.0, "d": 150.7, "h": 75.0, "mass": 0.904, "palletId": 3, "actual": 480}, {"id": 417, "partNo": "624B2-GI200", "name": "BRKT-EXT. REINF, LH", "category": "FRT MBR", "tag": "BRKT", "w": 33.1, "d": 162.6, "h": 77.5, "mass": 0.531, "palletId": 7, "actual": 750}, {"id": 418, "partNo": "624B3-GI200", "name": "BRKT-EXT. REINF, RH", "category": "FRT MBR", "tag": "BRKT", "w": 33.1, "d": 162.6, "h": 77.5, "mass": 0.524, "palletId": 7, "actual": 750}, {"id": 419, "partNo": "54510-PI000", "name": "ARM ASSY, LH", "category": "ARM", "tag": "L/ARM FRT", "w": 467.1, "d": 428.5, "h": 89.2, "mass": 3.499, "palletId": 7, "actual": 250}, {"id": 420, "partNo": "54511-PI000", "name": "ARM ASSY, RH", "category": "ARM", "tag": "L/ARM FRT", "w": 467.1, "d": 428.5, "h": 89.2, "mass": 3.483, "palletId": 7, "actual": 250}, {"id": 422, "partNo": "55445-PI000", "name": "PIPE ASSY BODU MTG-RR, LH", "category": "RR MBR", "tag": "PIPE", "w": 153.4, "d": 92.8, "h": 69.0, "mass": 1.458, "palletId": 7, "actual": 310}, {"id": 423, "partNo": "55445-PI500", "name": "PIPE ASSY BODU MTG-RR, RH", "category": "RR MBR", "tag": "PIPE", "w": 153.4, "d": 92.8, "h": 69.0, "mass": 1.467, "palletId": 7, "actual": 310}, {"id": 425, "partNo": "55472-PI200", "name": "CAM-GUIDE", "category": "H/W", "tag": "H/W", "w": 45.4, "d": 15.0, "h": 46.3, "mass": 0.052, "palletId": 7, "actual": 8800}, {"id": 426, "partNo": "55428-PI000", "name": "BRKT-ASSY STAB BAR MTG LH", "category": "RR MBR", "tag": "BRKT", "w": 84.0, "d": 124.5, "h": 34.0, "mass": 0.226, "palletId": 3, "actual": 2000}, {"id": 427, "partNo": "55429-PI000", "name": "BRKT-ASSY STAB BAR MTG RH", "category": "RR MBR", "tag": "BRKT", "w": 84.0, "d": 124.5, "h": 34.0, "mass": 0.226, "palletId": 3, "actual": 2000}, {"id": 428, "partNo": "55485-PI000", "name": "STOPPER-LWR", "category": "RR MBR", "tag": "STOPPER", "w": 96.0, "d": 95.6, "h": 13.5, "mass": 0.16, "palletId": 7, "actual": 2790}, {"id": 429, "partNo": "55495-PI000", "name": "BAR-RR CROSS MEMBER", "category": "RR MBR", "tag": "BAR", "w": 468.0, "d": 67.3, "h": 24.0, "mass": 0.76, "palletId": 7, "actual": 500}, {"id": 430, "partNo": "55220-PI000", "name": "ARM ASSY-RR LWR, LH", "category": "ARM", "tag": "L/ARM RR", "w": 497.3, "d": 199.3, "h": 82.3, "mass": 2.85, "palletId": 7, "actual": 180}, {"id": 431, "partNo": "55221-PI000", "name": "ARM ASSY-RR LWR, RH", "category": "ARM", "tag": "L/ARM RR", "w": 497.3, "d": 199.3, "h": 82.3, "mass": 2.85, "palletId": 4, "actual": 180}, {"id": 432, "partNo": "55230-PI000", "name": "COVER-RR LWR ARM, LH", "category": "ARM", "tag": "PROTECTOR", "w": 316.4, "d": 265.5, "h": 57.6, "mass": 0.21, "palletId": 4, "actual": 290}, {"id": 433, "partNo": "55231-PI000", "name": "COVER-RR LWR ARM, RH", "category": "ARM", "tag": "PROTECTOR", "w": 316.4, "d": 265.5, "h": 57.6, "mass": 0.21, "palletId": 4, "actual": 290}, {"id": 435, "partNo": "55125-PI000", "name": "ARM ASSY-RR UPR FR", "category": "ARM", "tag": "U/ARM RR", "w": 343.5, "d": 24.0, "h": 83.4, "mass": 0.845, "palletId": 7, "actual": 1120}, {"id": 436, "partNo": "55135-PI000", "name": "ARM ASSY-RR UPR FR, LH", "category": "ARM", "tag": "U/ARM RR", "w": 402.1, "d": 24.0, "h": 112.7, "mass": 0.974, "palletId": 7, "actual": 880}, {"id": 437, "partNo": "55136-PI000", "name": "ARM ASSY-RR UPR RR, RH", "category": "ARM", "tag": "U/ARM RR", "w": 402.1, "d": 24.0, "h": 112.7, "mass": 0.966, "palletId": 7, "actual": 880}, {"id": 438, "partNo": "55260-PI000", "name": "ARM ASSY-RR ASSIST", "category": "ARM", "tag": "A/ARM RR", "w": 523.9, "d": 35.0, "h": 72.0, "mass": 0.91, "palletId": 7, "actual": 784}, {"id": 439, "partNo": "55280-PI000", "name": "ARM ASSY-RR TRALING", "category": "ARM", "tag": "T/ARM RR", "w": 373.2, "d": 67.4, "h": 69.7, "mass": 0.589, "palletId": 7, "actual": 360}, {"id": 440, "partNo": "55333-GI000", "name": "SPRING PAD-RR LWR ARM", "category": "ARM", "tag": "PAD", "w": 122.3, "d": 126.8, "h": 55.4, "mass": 0.2133, "palletId": 7, "actual": 560}, {"id": 441, "partNo": "65104-CV000", "name": "BRKT-DR SCUFF MT'G FR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 42.0, "d": 62.8, "h": 13.6, "mass": 0.012, "palletId": 7, "actual": 24000}, {"id": 442, "partNo": "65258-CV000", "name": "EXTN-SIDE SILL INR CTR, LH", "category": "CTR FLR", "tag": "SIDE SILL", "w": 180.0, "d": 19.7, "h": 70.8, "mass": 0.112, "palletId": 7, "actual": 4000}, {"id": 443, "partNo": "651L6-CV000", "name": "BRKT-CONSOLE MT'G", "category": "CTR FLR", "tag": "BRKT", "w": 116.8, "d": 29.6, "h": 29.6, "mass": 0.042, "palletId": 7, "actual": 6000}, {"id": 444, "partNo": "651E4-XG000", "name": "REINF-FR SEAT CROSS MBR SD, LH", "category": "CTR FLR", "tag": "BRKT", "w": 82.3, "d": 275.2, "h": 33.7, "mass": 0.107, "palletId": 4, "actual": 3000}, {"id": 445, "partNo": "651F4-XG000", "name": "REINF-FR SEAT CROSS MBR SD, RH", "category": "CTR FLR", "tag": "BRKT", "w": 82.3, "d": 275.2, "h": 33.7, "mass": 0.109, "palletId": 4, "actual": 3000}, {"id": 446, "partNo": "65236-GI000", "name": "MEMBER-CTR FLOOR RR  CROSS, LH", "category": "CTR FLR", "tag": "BRKT", "w": 406.7, "d": 100.0, "h": 28.3, "mass": 0.262, "palletId": 4, "actual": 1500}, {"id": 447, "partNo": "65246-GI000", "name": "MEMBER-CTR FLOOR RR  CROSS, RH", "category": "CTR FLR", "tag": "BRKT", "w": 406.7, "d": 100.0, "h": 28.3, "mass": 0.262, "palletId": 7, "actual": 1500}, {"id": 448, "partNo": "65278-GI000", "name": "REINF-FR SEAT CROSS MBE INR, LH", "category": "CTR FLR", "tag": "BRKT", "w": 180.3, "d": 1309.5, "h": 6.3, "mass": 2.222, "palletId": 7, "actual": 500}, {"id": 449, "partNo": "65152-GI000", "name": "MEMBER-FR SEAT CROSS, LH", "category": "CTR FLR", "tag": "BRKT", "w": 180.3, "d": 1309.5, "h": 25.9, "mass": 2.906, "palletId": 7, "actual": 300}, {"id": 450, "partNo": "65176-XG000", "name": "MEMBER-FR SEAT CROSS, RH", "category": "CTR FLR", "tag": "BRKT", "w": 180.3, "d": 1039.5, "h": 25.8, "mass": 2.86, "palletId": 3, "actual": 300}, {"id": 452, "partNo": "55445-XG000", "name": "PIPE ASSY BODY MTG-RR, LH", "category": "RR MBR", "tag": "PIPE", "w": 91.0, "d": 153.4, "h": 69.0, "mass": 1.034, "palletId": 5, "actual": 310}, {"id": 453, "partNo": "55445-XG500", "name": "PIPE ASSY BODY MTG-RR, RH", "category": "RR MBR", "tag": "PIPE", "w": 91.0, "d": 153.4, "h": 69.0, "mass": 1.034, "palletId": 5, "actual": 310}, {"id": 454, "partNo": "55210-GI100", "name": "ARM COMPLETE-RR LWR, LH", "category": "ARM", "tag": "L/ARM RR", "w": 497.1, "d": 145.4, "h": 91.1, "mass": 2.426, "palletId": 5, "actual": 184}, {"id": 455, "partNo": "55211-GI100", "name": "ARM COMPLETE-RR LWR, RH", "category": "ARM", "tag": "L/ARM RR", "w": 497.1, "d": 145.4, "h": 91.1, "mass": 2.426, "palletId": 5, "actual": 184}, {"id": 456, "partNo": "0", "name": " CASE COOL'G ASSY, LWR", "category": "BPC", "tag": "COOLING PLATE", "w": 1060.0, "d": 460.0, "h": 85.0, "mass": 4.0, "palletId": 5, "actual": 10}, {"id": 457, "partNo": "0", "name": "PROFILE FRT", "category": "BPC", "tag": "PROFILE FRT", "w": 734.0, "d": 183.0, "h": 23.0, "mass": 2.7, "palletId": 5, "actual": 43}, {"id": 458, "partNo": "0", "name": "PROFILE RR", "category": "BPC", "tag": "PROFILE RR", "w": 734.0, "d": 66.0, "h": 23.0, "mass": 1.2, "palletId": 5, "actual": 130}, {"id": 459, "partNo": "EZ375-P2000", "name": "PNL ASSY-BATTERY PACK UPR CASE", "category": "BPC", "tag": "BATTERY PACK", "w": 1893.3, "d": 1287.4, "h": 160.6, "mass": 18.0407, "palletId": 5, "actual": 5}, {"id": 460, "partNo": "EZ375-54100", "name": "BRKT-POWER RELAY ASSY MTG, RR", "category": "BPC", "tag": "BRKT POWER RELAY", "w": 834.4, "d": 457.0, "h": 102.0, "mass": 4.7159, "palletId": 5, "actual": 4}, {"id": 461, "partNo": "EZ375-54000", "name": "BRKT-POWER RELAY ASSY MTG, RR", "category": "BPC", "tag": "BRKT POWER RELAY", "w": 834.4, "d": 479.0, "h": 102.0, "mass": 4.4973, "palletId": 5, "actual": 4}, {"id": 462, "partNo": "EZ375-55000", "name": "BRKT-H.V CONNECT MTG, FR", "category": "BPC", "tag": "BRKT H.V CONNECTOR", "w": 228.3, "d": 212.0, "h": 108.0, "mass": 0.5962, "palletId": 5, "actual": 60}, {"id": 463, "partNo": "0", "name": "PROFILE SIDE LH", "category": "BPC", "tag": "PROFILE SIDE", "w": 2140.0, "d": 40.0, "h": 47.0, "mass": 3.561, "palletId": 1, "actual": 450}, {"id": 464, "partNo": "0", "name": "PROFILE SIDE RH", "category": "BPC", "tag": "PROFILE SIDE", "w": 2140.0, "d": 40.0, "h": 47.0, "mass": 3.561, "palletId": 1, "actual": 450}, {"id": 465, "partNo": "0", "name": "GASKET_UPR_S", "category": "BPC", "tag": "GASKET 긴거", "w": 781.0, "d": 15.0, "h": 3.0, "mass": 0.044, "palletId": 7, "actual": 6800}, {"id": 466, "partNo": "0", "name": "GASKET_UPR_L", "category": "BPC", "tag": "GASKET 긴거", "w": 2074.0, "d": 15.0, "h": 3.0, "mass": 0.118, "palletId": 1, "actual": 15200}, {"id": 467, "partNo": "0", "name": "GASKET_LWR_S_FRT", "category": "BPC", "tag": "GASKET 긴거", "w": 756.0, "d": 15.0, "h": 3.0, "mass": 0.043, "palletId": 7, "actual": 6800}, {"id": 468, "partNo": "0", "name": "GASKET_LWR_S_RR", "category": "BPC", "tag": "GASKET 긴거", "w": 756.0, "d": 15.0, "h": 3.0, "mass": 0.043, "palletId": 7, "actual": 6800}, {"id": 469, "partNo": "0", "name": "GASKET_LWR_L", "category": "BPC", "tag": "GASKET 긴거", "w": 2070.0, "d": 15.0, "h": 3.0, "mass": 0.117, "palletId": 1, "actual": 15200}, {"id": 476, "partNo": "0", "name": "BAR_ASSY_CTR_1P56S", "category": "BPC", "tag": "BAR ASSY CTR", "w": 108.5, "d": 551.0, "h": 11.4, "mass": 1.48, "palletId": 5, "actual": 300}, {"id": 477, "partNo": "0", "name": "CASE_ASSY_UPR_LH/RH_1P24S", "category": "BPC", "tag": "BATTERY UPR CASE", "w": 242.7, "d": 619.2, "h": 20.5, "mass": 1.56, "palletId": 5, "actual": 80}, {"id": 481, "partNo": "0", "name": "UPR CASE", "category": "BPC", "tag": "BATTERY PACK", "w": 1843.0, "d": 1285.0, "h": 170.0, "mass": 16.7028, "palletId": 1, "actual": 5}, {"id": 483, "partNo": "0", "name": "BRKT ASSY-CMU SUBPACK MTG, SIDE", "category": "BPC", "tag": "BRKT POWER RELAY", "w": 468.0, "d": 204.0, "h": 106.0, "mass": 1.4917, "palletId": 5, "actual": 25}, {"id": 484, "partNo": "0", "name": "BRKT ASSY-H.V CONNECT MTG", "category": "BPC", "tag": "BRKT POWER RELAY", "w": 834.0, "d": 460.0, "h": 125.0, "mass": 3.8858, "palletId": 1, "actual": 36}, {"id": 485, "partNo": "0", "name": "GASKET-SERVICE", "category": "BPC", "tag": "GASKET 네모", "w": 155.2, "d": 135.2, "h": 2.0, "mass": 0, "palletId": 1, "actual": 450}, {"id": 486, "partNo": "0", "name": "GASKET", "category": "BPC", "tag": "GASKET 네모", "w": 1091.0, "d": 788.0, "h": 30.0, "mass": 0.6, "palletId": 1, "actual": 20}, {"id": 487, "partNo": "64900-Z9000", "name": "BRKT ASSY-POWER RELAY ASSY MTG", "category": "BPC", "tag": "BUMPER AL", "w": 1549.0, "d": 343.0, "h": 233.0, "mass": 13.6, "palletId": 1, "actual": 18}, {"id": 488, "partNo": "64900-P8000", "name": "BEAM COMPL-FR BUMPER", "category": "BPC", "tag": "BUMPER AL", "w": 1444.2, "d": 263.2, "h": 254.0, "mass": 6.185, "palletId": 1, "actual": 30}];

const PALLETS=[
  {id:1,name:"방청 스틸 대",  w:2170,d:1360,h:900,maxKg:2000,tare:102,price:186660},
  {id:3,name:"방청 스틸 소",  w:1360,d:1030,h:900,maxKg:1000,tare:55, price:118867},
  {id:4,name:"방청 스틸 소중",w:1340,d:1020,h:530,maxKg:1000,tare:50, price:104611},
  {id:5,name:"방청 스틸 미니",w:1160,d:660, h:550,maxKg:500, tare:43, price:76042},
  {id:6,name:"방청 렌탈 소",  w:1360,d:1030,h:900,maxKg:1000,tare:55, price:100144},
  {id:7,name:"방청 렌탈 미니",w:1160,d:660, h:550,maxKg:500, tare:43, price:63355},
];
const ORIENTS=[{l:"W×D×H",a:[0,1,2]},{l:"W×H×D",a:[0,2,1]},{l:"D×W×H",a:[1,0,2]},{l:"D×H×W",a:[1,2,0]},{l:"H×W×D",a:[2,0,1]},{l:"H×D×W",a:[2,1,0]}];
const fmt=n=>Math.round(n).toLocaleString("ko-KR");
const fmtD=n=>parseFloat(n.toFixed(1)).toLocaleString("ko-KR");
const fmtF=n=>(n*100).toFixed(1)+"%";
const netKg=p=>p.maxKg-p.tare;

function getOrients(p,dims,mass){
  const net=netKg(p);
  return ORIENTS.map(o=>{
    const[dw,dd,dh]=[dims[o.a[0]],dims[o.a[1]],dims[o.a[2]]];
    const cW=Math.floor(p.w/dw),cD=Math.floor(p.d/dd),cH=Math.floor(p.h/dh);
    const qs=cW*cD*cH;let qpp=qs,lim=false;
    if(mass>0&&net>0){const qw=Math.floor(net/mass);if(qw<qs){qpp=qw;lim=true;}}
    return{l:o.l,cW,cD,cH,qs,qpp,lim};
  });
}
function getBest(os){return os.reduce((a,b)=>b.qpp>a.qpp?b:a,os[0]);}

function shapeFeatures(w,d,h){
  if(!w||!d||!h)return null;
  const dims=[w,d,h].sort((a,b)=>b-a);
  const[longest,mid,shortest]=[dims[0],dims[1],dims[2]];
  return{flatness:shortest/longest,elongation:longest/mid,squareness:mid/longest,volume:w*d*h};
}
function shapeLabel(f){
  if(!f)return"—";
  if(f.flatness<0.2)return"극납작";if(f.flatness<0.4)return"납작형";
  if(f.elongation>4)return"극길쭉";if(f.elongation>2.5)return"길쭉형";
  if(f.squareness>0.7&&f.flatness>0.5)return"블록형";return"중간형";
}

// 유사도 계산: 대분류(20)+소분류(20)+형상비율(30)+부피(30)
function calcSim(np,dp){
  let score=0;
  if(np.category&&dp.category)score+=(np.category===dp.category?20:0);
  if(np.tag&&dp.tag)score+=(np.tag===dp.tag?20:0);
  const nf=shapeFeatures(+np.w,+np.d,+np.h),df=shapeFeatures(+dp.w,+dp.d,+dp.h);
  if(nf&&df){
    const flatSim=1-Math.abs(nf.flatness-df.flatness);
    const elongSim=1-Math.min(1,Math.abs(nf.elongation-df.elongation)/Math.max(nf.elongation,df.elongation));
    const squareSim=1-Math.abs(nf.squareness-df.squareness);
    score+=(flatSim*10)+(elongSim*10)+(squareSim*10);
  }
  if(nf&&df&&nf.volume>0&&df.volume>0){
    const ratio=Math.min(nf.volume,df.volume)/Math.max(nf.volume,df.volume);
    score+=(ratio>=0.5?((ratio-0.5)/0.5)*30:0);
  }
  return Math.min(100,score);
}

function isSameProduct(np,dp){
  if(!np.tag||!dp.tag||np.tag!==dp.tag)return false;
  if(np.category&&dp.category&&np.category!==dp.category)return false;
  return["w","d","h"].every(k=>{
    const nv=parseFloat(np[k])||0,dv=parseFloat(dp[k])||0;
    if(nv<=0||dv<=0)return false;
    return Math.min(nv,dv)/Math.max(nv,dv)>=0.95;
  });
}

function filterForFillRate(newP,dbList){
  const nf=shapeFeatures(+newP.w,+newP.d,+newP.h);
  if(!nf)return[];
  // 1. 소분류 일치
  let filtered=dbList.filter(x=>x.tag===newP.tag&&x.actual>0&&x.w>0&&x.d>0&&x.h>0);
  // 소분류 없으면 대분류로 확장
  if(filtered.length===0&&newP.category)
    filtered=dbList.filter(x=>x.category===newP.category&&x.actual>0&&x.w>0&&x.d>0&&x.h>0);
  if(filtered.length===0)return[];
  // 2. 부피 ±50%
  const volF=filtered.filter(x=>{
    const df=shapeFeatures(+x.w,+x.d,+x.h);
    if(!df)return false;
    return Math.min(nf.volume,df.volume)/Math.max(nf.volume,df.volume)>=0.5;
  });
  const useVol=volF.length>=3?volF:filtered;
  // 3. 형상 유사도 상위 60% (최소 5개)
  const scored=useVol.map(x=>{
    const df=shapeFeatures(+x.w,+x.d,+x.h);
    if(!df)return{...x,shapeSim:0};
    const flatSim=1-Math.abs(nf.flatness-df.flatness);
    const elongSim=1-Math.min(1,Math.abs(nf.elongation-df.elongation)/Math.max(nf.elongation,df.elongation));
    return{...x,shapeSim:(flatSim+elongSim)/2};
  }).sort((a,b)=>b.shapeSim-a.shapeSim);
  return scored.slice(0,Math.max(5,Math.ceil(scored.length*0.6)));
}

function calcOneProduct(prod,db){
  const pw=+prod.w,pd=+prod.d,ph=+prod.h,mass=+prod.mass,aq=+prod.annualQty;
  if(!pw||!pd||!ph)return null;
  const newP={category:prod.category,tag:prod.tag,w:pw,d:pd,h:ph,mass};
  const scored=db.filter(x=>x.w>0&&x.d>0&&x.h>0&&x.actual>0)
    .map(x=>({...x,score:calcSim(newP,x),exactMatch:isSameProduct(newP,x)}))
    .sort((a,b)=>b.score-a.score);
  let palletId=prod.palletId||null;
  if(!palletId){
    const votes={};
    const src=scored.filter(x=>x.tag===prod.tag&&x.palletId).length>0
      ?scored.filter(x=>x.tag===prod.tag):scored.slice(0,10);
    src.forEach(x=>{votes[x.palletId]=(votes[x.palletId]||0)+x.score;});
    const top=Object.keys(votes).sort((a,b)=>votes[b]-votes[a])[0];
    palletId=top?+top:null;
  }
  const p=PALLETS.find(x=>x.id===palletId);
  if(!p)return{prod,error:"파렛트 미선택",scored};
  const orients=getOrients(p,[pw,pd,ph],mass);
  const best=getBest(orients);
  const pVol=p.w*p.d*p.h,pv=pw*pd*ph,net=netKg(p);
  const exactMatches=scored.filter(m=>m.exactMatch&&m.actual>0);
  if(exactMatches.length>0){
    const estQ=Math.round(exactMatches.reduce((s,m)=>s+m.actual,0)/exactMatches.length);
    return{prod,p,best,qpp:best.qpp,estQ,corrRatio:null,exactMatch:true,exactCount:exactMatches.length,tagMatchCount:0,pVol,pv,net,mass,aq,scored};
  }
  const fillSource=filterForFillRate(prod,db);
  if(fillSource.length===0)return{prod,p,best,qpp:best.qpp,estQ:null,corrRatio:null,exactMatch:false,tagMatchCount:0,noData:true,pVol,pv,net,mass,aq,scored};
  const ratios=fillSource.map(m=>{
    const mO=getOrients(p,[+m.w,+m.d,+m.h],+m.mass||0);
    const mB=getBest(mO);
    return mB.qpp>0?m.actual/mB.qpp:null;
  }).filter(r=>r!==null&&r>0);
  if(ratios.length===0)return{prod,p,best,qpp:best.qpp,estQ:null,corrRatio:null,exactMatch:false,tagMatchCount:fillSource.length,noData:true,pVol,pv,net,mass,aq,scored};
  const corrRatio=ratios.reduce((a,b)=>a+b,0)/ratios.length;
  let estQ=Math.round(best.qpp*corrRatio);
  if(mass>0&&net>0){const qw=Math.floor(net/mass);if(qw<estQ)estQ=qw;}
  return{prod,p,best,qpp:best.qpp,estQ,corrRatio,exactMatch:false,tagMatchCount:fillSource.length,pVol,pv,net,mass,aq,scored};
}

// ── 라이트 테마 ──────────────────────────────────────────
const C={
  bg:"#f0f2f5",sidebar:"#1e2333",sideText:"#a0aec0",sideActive:"#ffffff",sideActiveBg:"rgba(255,255,255,0.12)",
  card:"#ffffff",border:"#e2e8f0",text:"#1a202c",textSub:"#718096",textMuted:"#a0aec0",
  blue:"#3b82f6",green:"#22c55e",amber:"#f59e0b",purple:"#8b5cf6",red:"#ef4444",
  input:"#ffffff",inputBorder:"#d1d5db",
};
const S={
  wrap:{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:"'Apple SD Gothic Neo','Malgun Gothic',sans-serif",color:C.text},
  sidebar:{width:220,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh"},
  sideHeader:{padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)"},
  sideLogo:{fontSize:13,fontWeight:700,color:"#ffffff",letterSpacing:"0.08em",textTransform:"uppercase"},
  sideSubtitle:{fontSize:11,color:C.sideText,marginTop:3},
  sideNav:{padding:"12px 8px",flex:1},
  navItem:(a)=>({display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:a?600:400,color:a?C.sideActive:C.sideText,background:a?C.sideActiveBg:"transparent",marginBottom:4,transition:"all 0.15s"}),
  main:{flex:1,padding:"24px 28px",overflowY:"auto",background:C.bg},
  pageTitle:{fontSize:20,fontWeight:700,color:C.text,marginBottom:4},
  pageSubtitle:{fontSize:13,color:C.textSub,marginBottom:20},
  kpiGrid:{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20},
  kpiCard:(color)=>({background:C.card,border:`1.5px solid ${color}`,borderRadius:12,padding:"16px 18px",position:"relative",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}),
  kpiAccent:(color)=>({position:"absolute",top:0,left:0,right:0,height:4,background:color,borderRadius:"12px 12px 0 0"}),
  kpiLabel:{fontSize:11,color:C.textSub,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:8},
  kpiValue:{fontSize:26,fontWeight:700,lineHeight:1,color:C.text},
  kpiUnit:{fontSize:11,color:C.textMuted,marginTop:4},
  section:{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px",marginBottom:14,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"},
  sectionTitle:{fontSize:12,fontWeight:700,color:C.textSub,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:14,display:"flex",alignItems:"center",gap:8},
  label:{fontSize:11,color:C.textSub,fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase",marginBottom:4,display:"block"},
  input:{width:"100%",boxSizing:"border-box",background:C.input,border:`1px solid ${C.inputBorder}`,borderRadius:7,padding:"7px 10px",fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"},
  select:{width:"100%",boxSizing:"border-box",background:C.input,border:`1px solid ${C.inputBorder}`,borderRadius:7,padding:"7px 10px",fontSize:13,color:C.text,outline:"none",fontFamily:"inherit",appearance:"none"},
  btn:(v)=>({padding:"8px 16px",borderRadius:7,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit",...(v==="primary"?{background:C.blue,color:"#fff"}:v==="success"?{background:C.green,color:"#fff"}:v==="danger"?{background:"#fee2e2",color:C.red,border:`1px solid #fecaca`}:{background:"#f1f5f9",color:C.textSub,border:`1px solid ${C.border}`})}),
  palletGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10},
  palletCard:(sel)=>({background:sel?"#eff6ff":"#f8fafc",border:`1.5px solid ${sel?C.blue:C.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all 0.15s"}),
  orientGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8},
  orientCard:(best,lim)=>({background:best?"#f0fdf4":lim?"#fffbeb":"#f8fafc",border:`1px solid ${best?"#86efac":lim?"#fcd34d":C.border}`,borderRadius:8,padding:"10px",textAlign:"center"}),
  resultGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12},
  resultCard:(color)=>({background:"#f8fafc",border:`1.5px solid ${color}55`,borderRadius:10,padding:"14px 16px"}),
  tag:(color)=>({display:"inline-block",fontSize:10,padding:"2px 7px",borderRadius:4,fontWeight:600,...(color==="blue"?{background:"#dbeafe",color:"#1d4ed8"}:color==="green"?{background:"#dcfce7",color:"#15803d"}:{background:"#fef3c7",color:"#b45309"})}),
  divider:{border:"none",borderTop:`1px solid ${C.border}`,margin:"12px 0"},
  weightBar:{background:"#f8fafc",borderRadius:8,padding:"12px 14px",border:`1px solid ${C.border}`,marginBottom:10},
  barTrack:{height:6,background:"#e2e8f0",borderRadius:3,overflow:"hidden",margin:"6px 0 5px"},
  msg:{textAlign:"center",padding:"2rem",color:C.textMuted,fontSize:13},
};

function KpiCard({label,value,unit,color,sub}){
  return(
    <div style={S.kpiCard(color)}>
      <div style={S.kpiAccent(color)}/>
      <div style={S.kpiLabel}>{label}</div>
      <div style={S.kpiValue}>{value}</div>
      {unit&&<div style={S.kpiUnit}>{unit}</div>}
      {sub&&<div style={{fontSize:10,color:C.textMuted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

export default function App(){
  const[tab,setTab]=useState("quote");
  const[db,setDb]=useState(()=>INITIAL_DB.map(x=>({...x,image:null})));
  const[editingDbItem,setEditingDbItem]=useState(null); // DB 수정 중인 항목
  const[quote,setQuote]=useState({category:"",tag:"",w:"",d:"",h:"",mass:"",annualQty:"",palletId:null,image:null,shapeData:null});
  const[matched,setMatched]=useState([]);
  const[analyzing,setAnalyzing]=useState(false);
  const[qResult,setQResult]=useState(null);
  const[dbForm,setDbForm]=useState({category:"",tag:"",w:"",d:"",h:"",mass:"",actual:"",palletId:null,image:null,analyzing:false,partNo:"",name:""});
  const[dbSearch,setDbSearch]=useState("");
  const[dbCatFilter,setDbCatFilter]=useState("");
  const[dbPage,setDbPage]=useState(0);
  const DB_PAGE=20;

  const allCategories=[...new Set(db.map(x=>x.category).filter(Boolean))].sort();
  const allTags=[...new Set(db.filter(x=>!dbForm.category||x.category===dbForm.category).map(x=>x.tag).filter(Boolean))].sort();
  const quoteTags=[...new Set(db.filter(x=>!quote.category||x.category===quote.category).map(x=>x.tag).filter(Boolean))].sort();

  // 파렛트 단가 수정
  const[palletPrices,setPalletPrices]=useState(()=>{const i={};PALLETS.forEach(p=>{i[p.id]=p.price;});return i;});
  const[editingPriceId,setEditingPriceId]=useState(null);
  const[editingPriceVal,setEditingPriceVal]=useState("");
  function getPalletWithPrice(p){return{...p,price:palletPrices[p.id]||p.price};}
  function startEditPrice(e,pId,cur){e.stopPropagation();setEditingPriceId(pId);setEditingPriceVal(String(cur));}
  function commitPrice(pId){const v=parseInt(editingPriceVal.replace(/,/g,""))||0;if(v>0)setPalletPrices(prev=>({...prev,[pId]:v}));setEditingPriceId(null);}

  // 배치 처리
  const[batchItems,setBatchItems]=useState([]);
  const[batchResults,setBatchResults]=useState({});
  const[selectedIdx,setSelectedIdx]=useState(null);
  const[batchLoading,setBatchLoading]=useState(false);
  const batchFileRef=useRef();

  async function analyzeImage(b64){
    try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:200,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:b64}},{type:"text",text:'자동차 부품 형상을 JSON으로만 답: {"shape_tags":["플레이트","브라켓","하우징","파이프","기어","커버","링","복합형"]에서 해당,"flat_ratio":0~1,"elongated_ratio":0~1,"complexity":0~1}'}]}]})});const d=await res.json();return JSON.parse((d.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim());}catch{return{};}
  }
  async function handleDbImg(file){if(!file)return;const r=new FileReader();r.onload=async e=>{const b64=e.target.result.split(",")[1];setDbForm(f=>({...f,image:e.target.result,analyzing:true}));const sh=await analyzeImage(b64);setDbForm(f=>({...f,shapeData:sh,analyzing:false}));};r.readAsDataURL(file);}
  async function handleQuoteImg(file){if(!file)return;const r=new FileReader();r.onload=async e=>{const b64=e.target.result.split(",")[1];setQuote(q=>({...q,image:e.target.result,shapeData:null}));setAnalyzing(true);const sh=await analyzeImage(b64);setQuote(q=>({...q,shapeData:sh}));setAnalyzing(false);};r.readAsDataURL(file);}

  function saveDb(){
    if(!dbForm.tag||!dbForm.w||!dbForm.d||!dbForm.h||!dbForm.actual){alert("소분류, 사이즈, 실적입수는 필수입니다.");return;}
    setDb(prev=>[...prev,{id:Date.now(),partNo:dbForm.partNo,name:dbForm.name,category:dbForm.category,tag:dbForm.tag,w:+dbForm.w,d:+dbForm.d,h:+dbForm.h,mass:+dbForm.mass,actual:+dbForm.actual,palletId:dbForm.palletId,image:dbForm.image,shapeData:dbForm.shapeData}]);
    setDbForm({category:"",tag:"",w:"",d:"",h:"",mass:"",actual:"",palletId:null,image:null,analyzing:false,partNo:"",name:""});
  }
  function deleteDb(id){if(window.confirm("삭제하시겠습니까?"))setDb(prev=>prev.filter(x=>x.id!==id));}
  function startEditDb(item){setEditingDbItem({...item});}
  function saveEditDb(){
    if(!editingDbItem)return;
    setDb(prev=>prev.map(x=>x.id===editingDbItem.id?{...editingDbItem,w:+editingDbItem.w,d:+editingDbItem.d,h:+editingDbItem.h,mass:+editingDbItem.mass,actual:+editingDbItem.actual}:x));
    setEditingDbItem(null);
  }

  // 엑셀 업로드
  function parseExcel(file){
    const r=new FileReader();
    r.onload=e=>{
      try{
        const XLSX=window.XLSX;
        if(!XLSX){alert("엑셀 라이브러리 로딩 중입니다.");return;}
        const wb=XLSX.read(new Uint8Array(e.target.result),{type:"array"});
        const ws=wb.Sheets[wb.SheetNames[0]];
        const rows=XLSX.utils.sheet_to_json(ws,{defval:""});
        const colMap={
          partNo:["품번","part_no"],name:["품명","name"],
          category:["대분류","category"],tag:["소분류","구분","tag"],
          w:["가로","w","width","가로(mm)"],d:["세로","d","depth","세로(mm)"],
          h:["높이","h","height","높이(mm)"],mass:["중량","mass","weight","중량(kg)"],
          annualQty:["연간수량","연간 수량","연간생산수량","연간 생산수량","수량"],
        };
        function getVal(row,keys){for(const k of keys){const found=Object.keys(row).find(rk=>rk.trim().toLowerCase()===k.toLowerCase());if(found!==undefined&&row[found]!=="")return row[found];}return"";}
        const items=rows.map((row,i)=>({_idx:i,partNo:String(getVal(row,colMap.partNo)||""),name:String(getVal(row,colMap.name)||""),category:String(getVal(row,colMap.category)||""),tag:String(getVal(row,colMap.tag)||""),w:+getVal(row,colMap.w)||0,d:+getVal(row,colMap.d)||0,h:+getVal(row,colMap.h)||0,mass:+getVal(row,colMap.mass)||0,annualQty:+getVal(row,colMap.annualQty)||0})).filter(x=>x.w>0&&x.d>0&&x.h>0);
        if(items.length===0){alert("유효한 데이터가 없습니다.");return;}
        setBatchItems(items);setBatchResults({});setSelectedIdx(null);
        setBatchLoading(true);
        setTimeout(()=>{
          const results={};
          items.forEach((item,i)=>{
            const r=calcOneProduct(item,db);
            if(r&&r.p){r.p={...r.p,price:palletPrices[r.p.id]||r.p.price};}
            results[i]=r;
          });
          setBatchResults(results);setSelectedIdx(0);setBatchLoading(false);
        },50);
      }catch(err){alert("엑셀 파싱 오류: "+err.message);}
    };
    r.readAsArrayBuffer(file);
  }

  function downloadExcel(){
    const XLSX=window.XLSX;if(!XLSX){alert("엑셀 라이브러리 로딩 중입니다.");return;}
    const rows=batchItems.map((item,i)=>{
      const r=batchResults[i];
      if(!r||r.error)return{품번:item.partNo,품명:item.name,대분류:item.category,소분류:item.tag,가로:item.w,세로:item.d,높이:item.h,중량:item.mass,연간수량:item.annualQty,파렛트:"오류",이론적입수:"",이론개당단가:"",추정적입수:"",추정개당단가:"",연간포장비:"",비고:r?.error||"파렛트 미선택"};
      const{p,best,qpp,estQ,corrRatio,exactMatch,exactCount,tagMatchCount,noData,aq}=r;
      const cUC=qpp>0?Math.round(p.price/qpp):0;
      const eUC=estQ?Math.round(p.price/estQ):0;
      const ePC=estQ&&aq>0?Math.ceil(aq/estQ):0;
      const note=noData?"DB 비교군 없음":exactMatch?`실적값 직접 적용(${exactCount}개 평균)`:`보정비율 ${corrRatio?.toFixed(2)||"—"} (${tagMatchCount}개 기반)`;
      return{품번:item.partNo,품명:item.name,대분류:item.category,소분류:item.tag,가로:item.w,세로:item.d,높이:item.h,중량:item.mass,연간수량:aq,파렛트:p.name,이론적입수:qpp,이론개당단가:cUC,추정적입수:estQ||"",추정개당단가:estQ?eUC:"",연간포장비:estQ?p.price*ePC:"",비고:note};
    });
    const ws=XLSX.utils.json_to_sheet(rows);
    ws["!cols"]=[{wch:16},{wch:28},{wch:12},{wch:14},{wch:7},{wch:7},{wch:7},{wch:7},{wch:10},{wch:14},{wch:10},{wch:12},{wch:10},{wch:12},{wch:14},{wch:30}];
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"견적결과");
    XLSX.writeFile(wb,`포장견적_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  function downloadSample(){
    const XLSX=window.XLSX;if(!XLSX){alert("엑셀 라이브러리 로딩 중입니다.");return;}
    if(typeof JSZip==="undefined"){alert("JSZip 라이브러리 로딩 중입니다. 잠시 후 다시 시도해주세요.");return;}

    function escXml(v){return String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
    function colLetter(n){let s="";while(n>=0){s=String.fromCharCode(65+(n%26))+s;n=Math.floor(n/26)-1;}return s;}

    // ── 대분류별 소분류 그룹화 ──────────────────────────────
    const catList=allCategories;
    // 대분류별 소분류 목록 (중복 제거, 정렬)
    const catTagMap={};
    catList.forEach(cat=>{
      catTagMap[cat]=[...new Set(db.filter(x=>x.category===cat&&x.tag).map(x=>x.tag))].sort();
    });
    // Named Range 이름: 엑셀은 특수문자/공백 불가 → 알파벳+숫자만 남기고 _ 처리
    function toRangeName(cat){return cat.replace(/[ /\-]/g,"_").replace(/[^A-Za-z0-9가-힣_]/g,"_");}

    // ── 공유 문자열 테이블 ─────────────────────────────────
    const strs=[];const strMap={};
    function addStr(v){const s=String(v);if(!(s in strMap)){strMap[s]=strs.length;strs.push(s);}return strMap[s];}

    // ── 입력양식 시트 ─────────────────────────────────────
    const sampleData=[
      ["품번","품명","대분류","소분류","가로(mm)","세로(mm)","높이(mm)","중량(kg)","연간수량"],
      ["54530-S1000","B/JOINT-ASS'Y","ARM","B/JOINT",145,72,82,0.769,10000],
      ["55280-S1000W","RR T/ARM ASSY,LH","ARM","T/ARM RR",497,181,61,1.478,8000],
    ];
    let sheetXml='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      +'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
      +'<sheetData>';
    sampleData.forEach((row,r)=>{
      sheetXml+=`<row r="${r+1}">`;
      row.forEach((val,c)=>{
        const ref=colLetter(c)+(r+1);
        if(typeof val==="number"){sheetXml+=`<c r="${ref}" t="n"><v>${val}</v></c>`;}
        else{sheetXml+=`<c r="${ref}" t="s"><v>${addStr(val)}</v></c>`;}
      });
      sheetXml+="</row>";
    });
    sheetXml+="</sheetData>";

    // 데이터 유효성 검사
    // C열: 대분류 (직접 목록)
    const catInline='"'+catList.map(escXml).join(",")+'"';
    const catFormula=catInline.length<=255?catInline:`제품구분목록!$A$2:$A$${catList.length+1}`;
    // D열: 소분류 → INDIRECT(SUBSTITUTE(...)) 로 공백/특수문자 처리
    sheetXml+='<dataValidations count="2">'
      +`<dataValidation type="list" allowBlank="1" showDropDown="0" sqref="C2:C1000"><formula1>${escXml(catFormula)}</formula1></dataValidation>`
      +`<dataValidation type="list" allowBlank="1" showDropDown="0" sqref="D2:D1000"><formula1>INDIRECT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(C2," ","_"),"/","_"),"-","_"))</formula1></dataValidation>`
      +'</dataValidations>';
    sheetXml+="</worksheet>";

    // ── 제품구분목록 시트 ──────────────────────────────────
    // 대분류별로 컬럼에 소분류 목록 배치 (A열=대분류헤더, 각 열에 소분류)
    // 구조: 행1=헤더(대분류명), 행2~=소분류 목록
    // Named Range: 각 대분류명 → 해당 열의 소분류 범위
    const maxTagCount=Math.max(...catList.map(c=>catTagMap[c].length));
    let tagSheetXml='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      +'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
      +'<sheetData>';
    // 행1: 헤더 (각 열에 대분류명)
    tagSheetXml+=`<row r="1">`;
    catList.forEach((cat,c)=>{
      tagSheetXml+=`<c r="${colLetter(c)}1" t="s"><v>${addStr(cat)}</v></c>`;
    });
    tagSheetXml+="</row>";
    // 행2~: 소분류
    for(let r=0;r<maxTagCount;r++){
      tagSheetXml+=`<row r="${r+2}">`;
      catList.forEach((cat,c)=>{
        const tags=catTagMap[cat];
        if(r<tags.length){
          tagSheetXml+=`<c r="${colLetter(c)}${r+2}" t="s"><v>${addStr(tags[r])}</v></c>`;
        }
      });
      tagSheetXml+="</row>";
    }
    tagSheetXml+="</sheetData></worksheet>";

    // ── 공유 문자열 XML ────────────────────────────────────
    let sstXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${strs.length}" uniqueCount="${strs.length}">`;
    strs.forEach(s=>{sstXml+=`<si><t xml:space="preserve">${escXml(s)}</t></si>`;});
    sstXml+="</sst>";

    // ── Named Ranges (definedNames) ────────────────────────
    // 각 대분류 → 제품구분목록 시트의 해당 컬럼 범위
    let definedNamesXml="<definedNames>";
    catList.forEach((cat,c)=>{
      const tagCount=catTagMap[cat].length;
      if(tagCount===0)return;
      const rangeName=toRangeName(cat);
      const colL=colLetter(c);
      // 제품구분목록 시트의 해당 열 2행~(tagCount+1)행
      definedNamesXml+=`<definedName name="${escXml(rangeName)}">제품구분목록!$${colL}$2:$${colL}$${tagCount+1}</definedName>`;
    });
    definedNamesXml+="</definedNames>";

    // ── workbook.xml (definedNames 포함) ──────────────────
    const workbook=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="입력양식" sheetId="1" r:id="rId1"/>
    <sheet name="제품구분목록" sheetId="2" r:id="rId2"/>
  </sheets>
  ${definedNamesXml}
</workbook>`;

    // ── [Content_Types].xml ────────────────────────────────
    const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
</Types>`;

    const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

    const wbRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>`;

    // ── JSZip 조립 & 다운로드 ─────────────────────────────
    const zip=new JSZip();
    zip.file("[Content_Types].xml",contentTypes);
    zip.folder("_rels").file(".rels",rels);
    const xl=zip.folder("xl");
    xl.file("workbook.xml",workbook);
    xl.file("sharedStrings.xml",sstXml);
    xl.folder("_rels").file("workbook.xml.rels",wbRels);
    xl.folder("worksheets").file("sheet1.xml",sheetXml);
    xl.folder("worksheets").file("sheet2.xml",tagSheetXml);
    zip.generateAsync({type:"blob"}).then(blob=>{
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");a.href=url;a.download="견적입력_양식.xlsx";a.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
  }

  // ── DB 엑셀 완전 교체 ──────────────────────────────────
  function replaceDbFromExcel(file){
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const XLSX=window.XLSX;
        if(!XLSX){alert("엑셀 라이브러리 로딩 중입니다.");return;}
        const wb=XLSX.read(new Uint8Array(e.target.result),{type:"array"});
        const ws=wb.Sheets[wb.SheetNames[0]];
        const rows=XLSX.utils.sheet_to_json(ws,{defval:""});
        const pmap={'방청 스틸 대':1,'방청 스틸 소':3,'방청 스틸 소중':4,'방청 스틸 미니':5,'방청 렌탈 소':6,'방청 렌탈 미니':7,'방청 미니 렌탈':7};
        const colMap={
          partNo:["품번"],name:["품명"],
          category:["대분류"],tag:["소분류","구분"],
          w:["가로","가로(mm)"],d:["세로","세로(mm)"],h:["높이","높이(mm)"],
          mass:["중량","중량(kg)"],palletName:["파렛트"],actual:["실적입수량","실적입수"],
        };
        function getVal(row,keys){for(const k of keys){const found=Object.keys(row).find(rk=>rk.trim()===k);if(found!==undefined&&row[found]!=="")return row[found];}return"";}
        const newDb=rows.map((row,i)=>{
          const w=+getVal(row,colMap.w)||0;
          const d=+getVal(row,colMap.d)||0;
          const h=+getVal(row,colMap.h)||0;
          const actual=+getVal(row,colMap.actual)||0;
          const palletName=String(getVal(row,colMap.palletName)||"").trim();
          const palletId=pmap[palletName]||null;
          if(!w||!d||!h||!actual||!palletId)return null;
          return{
            id:Date.now()+i,
            partNo:String(getVal(row,colMap.partNo)||""),
            name:String(getVal(row,colMap.name)||""),
            category:String(getVal(row,colMap.category)||""),
            tag:String(getVal(row,colMap.tag)||""),
            w,d,h,
            mass:+getVal(row,colMap.mass)||0,
            palletId,actual,image:null,shapeData:null,
          };
        }).filter(Boolean);
        if(newDb.length===0){alert("유효한 데이터가 없습니다. 컬럼명을 확인해주세요.");return;}
        if(window.confirm(`기존 DB ${db.length}개를 모두 삭제하고 새 데이터 ${newDb.length}개로 교체하시겠습니까?`)){
          setDb(newDb);
          alert(`✅ DB 교체 완료: ${newDb.length}개 등록`);
        }
      }catch(err){alert("엑셀 파싱 오류: "+err.message);}
    };
    reader.readAsArrayBuffer(file);
  }

  useEffect(()=>{
    const pw=+quote.w,pd=+quote.d,ph=+quote.h;
    if(!pw||!pd||!ph){setMatched([]);setQResult(null);return;}
    const newP={category:quote.category,tag:quote.tag,w:pw,d:pd,h:ph,mass:+quote.mass};
    const scored=db.filter(x=>x.w>0&&x.d>0&&x.h>0&&x.actual>0).map(x=>({...x,score:calcSim(newP,x),exactMatch:isSameProduct(newP,x)})).sort((a,b)=>b.score-a.score);
    setMatched(scored);
    if(!quote.palletId){
      const votes={};
      const src=scored.filter(x=>x.tag===quote.tag&&x.palletId).length>0?scored.filter(x=>x.tag===quote.tag):scored.slice(0,10);
      src.forEach(x=>{votes[x.palletId]=(votes[x.palletId]||0)+x.score;});
      const top=Object.keys(votes).sort((a,b)=>votes[b]-votes[a])[0];
      if(top)setQuote(q=>({...q,palletId:+top}));
    }
  },[quote.category,quote.tag,quote.w,quote.d,quote.h,quote.mass,quote.shapeData,db]);

  useEffect(()=>{
    const pRaw=PALLETS.find(x=>x.id===quote.palletId);
    const p=pRaw?getPalletWithPrice(pRaw):null;
    const pw=+quote.w,pd=+quote.d,ph=+quote.h,mass=+quote.mass,aq=+quote.annualQty;
    if(!p||!pw||!pd||!ph){setQResult(null);return;}
    const orients=getOrients(p,[pw,pd,ph],mass);
    const best=getBest(orients);
    const pVol=p.w*p.d*p.h,pv=pw*pd*ph,net=netKg(p);
    const exactMatches=matched.filter(m=>m.exactMatch&&m.actual>0);
    if(exactMatches.length>0){
      const estQ=Math.round(exactMatches.reduce((s,m)=>s+m.actual,0)/exactMatches.length);
      setQResult({p,orients,best,qpp:best.qpp,estQ,corrRatio:null,exactMatch:true,exactCount:exactMatches.length,tagMatchCount:0,pVol,pv,net,mass,aq,noData:false});return;
    }
    const fillSource=filterForFillRate({category:quote.category,tag:quote.tag,w:pw,d:pd,h:ph},matched);
    if(fillSource.length===0){setQResult({p,orients,best,qpp:best.qpp,corrRatio:null,estQ:null,pVol,pv,net,mass,aq,exactMatch:false,tagMatchCount:0,noData:true});return;}
    const ratios=fillSource.map(m=>{const mO=getOrients(p,[+m.w,+m.d,+m.h],+m.mass||0);const mB=getBest(mO);return mB.qpp>0?m.actual/mB.qpp:null;}).filter(r=>r!==null&&r>0);
    if(ratios.length===0){setQResult({p,orients,best,qpp:best.qpp,corrRatio:null,estQ:null,pVol,pv,net,mass,aq,exactMatch:false,tagMatchCount:fillSource.length,noData:true});return;}
    const corrRatio=ratios.reduce((a,b)=>a+b,0)/ratios.length;
    let estQ=Math.round(best.qpp*corrRatio);
    if(mass>0&&net>0){const qw=Math.floor(net/mass);if(qw<estQ)estQ=qw;}
    setQResult({p,orients,best,qpp:best.qpp,corrRatio,estQ,pVol,pv,net,mass,aq,exactMatch:false,tagMatchCount:fillSource.length,noData:false});
  },[quote,matched,palletPrices]);

  const selPalletRaw=PALLETS.find(x=>x.id===quote.palletId);
  const selPallet=selPalletRaw?getPalletWithPrice(selPalletRaw):null;
  const kpiQpp=qResult?.qpp||0;
  const kpiEstQ=qResult?.estQ||null;
  const kpiUC=kpiQpp>0&&selPallet?Math.round(selPallet.price/kpiQpp):0;
  const kpiEstUC=kpiEstQ&&selPallet?Math.round(selPallet.price/kpiEstQ):0;
  const kpiAq=+quote.annualQty||0;
  const kpiUseQ=kpiEstQ||kpiQpp;
  const kpiTotal=kpiUseQ>0&&selPallet&&kpiAq?selPallet.price*Math.ceil(kpiAq/kpiUseQ):0;

  const filteredDb=db.filter(x=>{
    const matchCat=!dbCatFilter||x.category===dbCatFilter;
    const matchSearch=!dbSearch||(x.tag||"").toLowerCase().includes(dbSearch.toLowerCase())||(x.name||"").toLowerCase().includes(dbSearch.toLowerCase())||(x.partNo||"").toLowerCase().includes(dbSearch.toLowerCase())||(x.category||"").toLowerCase().includes(dbSearch.toLowerCase());
    return matchCat&&matchSearch;
  });
  const pageDb=filteredDb.slice(dbPage*DB_PAGE,(dbPage+1)*DB_PAGE);
  const totalPages=Math.ceil(filteredDb.length/DB_PAGE);

  return(
    <div style={S.wrap}>
      {/* SIDEBAR */}
      <div style={S.sidebar}>
        <div style={S.sideHeader}>
          <div style={S.sideLogo}>📦 PackCalc</div>
          <div style={S.sideSubtitle}>해외물류 포장 견적 시스템</div>
        </div>
        <div style={S.sideNav}>
          <div style={S.navItem(tab==="quote")} onClick={()=>setTab("quote")}>📋 견적 산출</div>
          <div style={S.navItem(tab==="db")} onClick={()=>setTab("db")}>
            🗄 유사 제품 DB <span style={{marginLeft:"auto",fontSize:11,background:"rgba(255,255,255,0.1)",color:"#a0aec0",padding:"1px 7px",borderRadius:10}}>{db.length}</span>
          </div>
        </div>
        <div style={{padding:"16px 20px",borderTop:"1px solid rgba(255,255,255,0.08)",fontSize:11,color:"#a0aec0"}}>
          <div style={{marginBottom:4}}>파렛트 단가 기준</div>
          <div style={{color:"#718096"}}>'26. 2분기</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={S.main}>
        {tab==="db"?<DBTab db={db} pageDb={pageDb} filteredDb={filteredDb} dbPage={dbPage} totalPages={totalPages} setDbPage={setDbPage} dbSearch={dbSearch} setDbSearch={setDbSearch} dbCatFilter={dbCatFilter} setDbCatFilter={setDbCatFilter} allCategories={allCategories} dbForm={dbForm} setDbForm={setDbForm} allTags={allTags} saveDb={saveDb} deleteDb={deleteDb} editingDbItem={editingDbItem} startEditDb={startEditDb} saveEditDb={saveEditDb} setEditingDbItem={setEditingDbItem} handleDbImg={handleDbImg} PALLETS={PALLETS} replaceDbFromExcel={replaceDbFromExcel}/>
        :<QuoteTab quote={quote} setQ={setQ} analyzing={analyzing} handleQuoteImg={handleQuoteImg} matched={matched} qResult={qResult} selPallet={selPallet} kpiQpp={kpiQpp} kpiEstQ={kpiEstQ} kpiUC={kpiUC} kpiEstUC={kpiEstUC} kpiTotal={kpiTotal} kpiAq={kpiAq} allCategories={allCategories} quoteTags={quoteTags} batchItems={batchItems} batchResults={batchResults} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} batchLoading={batchLoading} batchFileRef={batchFileRef} parseExcel={parseExcel} downloadExcel={downloadExcel} downloadSample={downloadSample} PALLETS={PALLETS} getPalletWithPrice={getPalletWithPrice} palletPrices={palletPrices} editingPriceId={editingPriceId} startEditPrice={startEditPrice} commitPrice={commitPrice} setEditingPriceVal={setEditingPriceVal} editingPriceVal={editingPriceVal} db={db}/>}
      </div>
    </div>
  );
}

// ── DB 탭 ─────────────────────────────────────────────────
function DBTab({db,pageDb,filteredDb,dbPage,totalPages,setDbPage,dbSearch,setDbSearch,dbCatFilter,setDbCatFilter,allCategories,dbForm,setDbForm,allTags,saveDb,deleteDb,editingDbItem,startEditDb,saveEditDb,setEditingDbItem,handleDbImg,PALLETS,replaceDbFromExcel}){
  const fileRef=useRef();
  const dbReplaceRef=useRef();
  const editTags=[...new Set(db.filter(x=>!editingDbItem?.category||x.category===editingDbItem?.category).map(x=>x.tag).filter(Boolean))].sort();

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
        <div style={S.pageTitle}>유사 제품 DB</div>
        <label style={{...S.btn("default"),cursor:"pointer",fontSize:12,marginLeft:"auto",display:"inline-block"}}>
          📂 엑셀로 DB 교체
          <input ref={dbReplaceRef} type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={e=>{if(e.target.files[0])replaceDbFromExcel(e.target.files[0]);e.target.value="";}}/>
        </label>
      </div>
      <div style={S.pageSubtitle}>충전율 보정에 사용되는 실적 데이터를 관리합니다 · 엑셀 업로드 시 기존 데이터를 완전 교체합니다</div>

      {/* 등록 폼 */}
      <div style={S.section}>
        <div style={S.sectionTitle}><span style={{width:3,height:14,background:C.blue,borderRadius:2,display:"inline-block"}}/>제품 등록</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:8}}>
          {[["대분류","category"],["품번","partNo"],["품명","name"]].map(([lbl,key])=>(
            <div key={key}>
              <label style={S.label}>{lbl}</label>
              {key==="category"?(
                <select value={dbForm.category} onChange={e=>setDbForm(f=>({...f,category:e.target.value,tag:""}))} style={S.select}>
                  <option value="">선택 또는 직접입력</option>
                  {allCategories.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              ):<input value={dbForm[key]||""} onChange={e=>setDbForm(f=>({...f,[key]:e.target.value}))} placeholder={key==="partNo"?"예: 55280-S1000":key==="name"?"예: ARM ASSY":""} style={S.input}/>}
            </div>
          ))}
          <div>
            <label style={S.label}>소분류 *</label>
            <input value={dbForm.tag||""} onChange={e=>setDbForm(f=>({...f,tag:e.target.value}))} placeholder="예: T/ARM RR" style={S.input} list="dbtaglist"/>
            <datalist id="dbtaglist">{allTags.map(t=><option key={t} value={t}/>)}</datalist>
          </div>
          <div>
            <label style={S.label}>사용 파렛트</label>
            <select value={dbForm.palletId||""} onChange={e=>setDbForm(f=>({...f,palletId:+e.target.value||null}))} style={S.select}>
              <option value="">선택</option>
              {PALLETS.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr) auto auto",gap:8,alignItems:"end"}}>
          {[["가로(mm)*","w"],["세로(mm)*","d"],["높이(mm)*","h"],["중량(kg)","mass"],["실적입수*","actual"]].map(([lbl,key])=>(
            <div key={key}><label style={S.label}>{lbl}</label><input type="number" value={dbForm[key]||""} onChange={e=>setDbForm(f=>({...f,[key]:e.target.value}))} placeholder="0" style={S.input}/></div>
          ))}
          <div>
            <label style={S.label}>사진</label>
            <label style={{...S.btn("default"),display:"block",textAlign:"center",cursor:"pointer",padding:"7px 8px"}}>
              {dbForm.analyzing?"분석중...":dbForm.image?"✓ 등록":"업로드"}
              <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleDbImg(e.target.files[0])}/>
            </label>
          </div>
          <div><label style={{...S.label,opacity:0}}>_</label><button onClick={saveDb} style={S.btn("primary")}>저장</button></div>
        </div>
      </div>

      {/* DB 목록 */}
      <div style={S.section}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap"}}>
          <div style={S.sectionTitle} className="no-mb">
            <span style={{width:3,height:14,background:C.purple,borderRadius:2,display:"inline-block"}}/>
            등록된 제품 ({filteredDb.length}개)
          </div>
          <select value={dbCatFilter} onChange={e=>{setDbCatFilter(e.target.value);setDbPage(0);}} style={{...S.select,width:130}}>
            <option value="">전체 대분류</option>
            {allCategories.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <input value={dbSearch} onChange={e=>{setDbSearch(e.target.value);setDbPage(0);}} placeholder="대분류/소분류/품명/품번 검색..." style={{...S.input,width:240,marginLeft:"auto"}}/>
        </div>

        {/* 수정 모달 */}
        {editingDbItem&&(
          <div style={{background:"#eff6ff",border:`1px solid ${C.blue}`,borderRadius:10,padding:"16px",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:600,color:C.blue,marginBottom:12}}>✏️ 항목 수정 중</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:8}}>
              {[["대분류","category"],["소분류","tag"],["품번","partNo"],["품명","name"]].map(([lbl,key])=>(
                <div key={key}><label style={S.label}>{lbl}</label>
                  {key==="category"?(
                    <select value={editingDbItem.category||""} onChange={e=>setEditingDbItem(x=>({...x,category:e.target.value}))} style={S.select}>
                      {allCategories.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  ):<input value={editingDbItem[key]||""} onChange={e=>setEditingDbItem(x=>({...x,[key]:e.target.value}))} style={S.input} list={key==="tag"?"edittaglist":undefined}/>}
                  {key==="tag"&&<datalist id="edittaglist">{editTags.map(t=><option key={t} value={t}/>)}</datalist>}
                </div>
              ))}
              <div>
                <label style={S.label}>파렛트</label>
                <select value={editingDbItem.palletId||""} onChange={e=>setEditingDbItem(x=>({...x,palletId:+e.target.value||null}))} style={S.select}>
                  <option value="">선택</option>
                  {PALLETS.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto auto",gap:8,alignItems:"end"}}>
              {[["가로(mm)","w"],["세로(mm)","d"],["높이(mm)","h"],["중량(kg)","mass"],["실적입수","actual"]].map(([lbl,key])=>(
                <div key={key}><label style={S.label}>{lbl}</label><input type="number" value={editingDbItem[key]||""} onChange={e=>setEditingDbItem(x=>({...x,[key]:e.target.value}))} style={S.input}/></div>
              ))}
              <button onClick={saveEditDb} style={S.btn("primary")}>저장</button>
              <button onClick={()=>setEditingDbItem(null)} style={S.btn("default")}>취소</button>
            </div>
          </div>
        )}

        {pageDb.map(item=>{
          const p=PALLETS.find(x=>x.id===item.palletId);
          return(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,background:"#f8fafc",borderRadius:8,border:`1px solid ${C.border}`,padding:"9px 12px",marginBottom:6}}>
              {item.image?<img src={item.image} style={{width:44,height:36,objectFit:"cover",borderRadius:5,flexShrink:0}}/>
                :<div style={{width:44,height:36,background:"#e2e8f0",borderRadius:5,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.textMuted}}>📦</div>}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:11,background:"#e0e7ff",color:"#3730a3",borderRadius:3,padding:"1px 6px",fontWeight:600}}>{item.category||"—"}</span>
                  <span style={{fontSize:12,fontWeight:600,color:C.text}}>{item.tag||"—"}</span>
                  {p&&<span style={{fontSize:10,background:"#dbeafe",color:"#1d4ed8",borderRadius:3,padding:"1px 5px"}}>{p.name}</span>}
                </div>
                <div style={{fontSize:11,color:C.textSub}}>
                  {item.partNo&&<span style={{marginRight:8}}>{item.partNo}</span>}
                  {item.w>0&&<span>{item.w}×{item.d}×{item.h}mm · {item.mass}kg · 적입 {fmt(item.actual)}개</span>}
                </div>
              </div>
              <button onClick={()=>startEditDb(item)} style={{...S.btn("default"),fontSize:12,padding:"4px 10px"}}>수정</button>
              <button onClick={()=>deleteDb(item.id)} style={{...S.btn("danger"),fontSize:12,padding:"4px 10px"}}>삭제</button>
            </div>
          );
        })}
        {totalPages>1&&(
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
            <button onClick={()=>setDbPage(p=>Math.max(0,p-1))} disabled={dbPage===0} style={S.btn("default")}>이전</button>
            <span style={{fontSize:12,color:C.textSub,lineHeight:"34px"}}>{dbPage+1} / {totalPages}</span>
            <button onClick={()=>setDbPage(p=>Math.min(totalPages-1,p+1))} disabled={dbPage===totalPages-1} style={S.btn("default")}>다음</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 견적 탭 ───────────────────────────────────────────────
function QuoteTab({quote,setQ,analyzing,handleQuoteImg,matched,qResult,selPallet,kpiQpp,kpiEstQ,kpiUC,kpiEstUC,kpiTotal,kpiAq,allCategories,quoteTags,batchItems,batchResults,selectedIdx,setSelectedIdx,batchLoading,batchFileRef,parseExcel,downloadExcel,downloadSample,PALLETS,getPalletWithPrice,palletPrices,editingPriceId,startEditPrice,commitPrice,setEditingPriceVal,editingPriceVal,db}){
  return(
    <div>
      <div style={S.pageTitle}>포장 견적 산출</div>
      <div style={S.pageSubtitle}>제품 사이즈를 입력하거나 엑셀로 여러 제품을 한번에 계산할 수 있습니다</div>

      {/* 엑셀 업로드 바 */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
        <div style={{fontSize:13,fontWeight:600,color:C.text,whiteSpace:"nowrap"}}>📊 일괄 계산</div>
        <div style={{fontSize:12,color:C.textSub,flex:1}}>엑셀 업로드: 품번/품명/대분류/소분류/가로/세로/높이/중량/연간수량</div>
        <button onClick={downloadSample} style={{...S.btn("default"),fontSize:12,whiteSpace:"nowrap"}}>양식 다운로드</button>
        <label style={{...S.btn("primary"),fontSize:12,cursor:"pointer",display:"inline-block",whiteSpace:"nowrap"}}>
          {batchLoading?"계산 중...":"📂 엑셀 업로드"}
          <input ref={batchFileRef} type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={e=>{if(e.target.files[0])parseExcel(e.target.files[0]);e.target.value="";}}/>
        </label>
        {batchItems.length>0&&(
          <button onClick={downloadExcel} style={{...S.btn("default"),fontSize:12,background:"#f0fdf4",color:"#15803d",border:"1px solid #86efac",whiteSpace:"nowrap"}}>⬇ 결과 엑셀</button>
        )}
      </div>

      {/* 일괄 계산 결과 */}
      {batchItems.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:14,marginBottom:14}}>
          <div style={{...S.section,padding:"10px",maxHeight:400,overflowY:"auto",marginBottom:0}}>
            <div style={{fontSize:11,fontWeight:700,color:C.textSub,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8,padding:"0 4px"}}>{batchItems.length}개 제품</div>
            {batchItems.map((item,i)=>{
              const r=batchResults[i];
              const isSel=selectedIdx===i;
              const dot=r?.error?C.red:r?.noData?C.amber:r?.exactMatch?C.purple:r?.estQ?C.green:C.blue;
              return(
                <div key={i} onClick={()=>setSelectedIdx(i)} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 8px",borderRadius:6,cursor:"pointer",background:isSel?"#eff6ff":"transparent",border:isSel?`1px solid ${C.blue}`:"1px solid transparent",marginBottom:3}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:dot,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:isSel?600:400,color:isSel?C.blue:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.partNo||`#${i+1}`}</div>
                    <div style={{fontSize:10,color:C.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.category} · {item.tag}</div>
                  </div>
                  {r?.qpp>0&&<span style={{fontSize:11,fontWeight:600,color:isSel?C.blue:C.textMuted}}>{fmt(r.estQ||r.qpp)}</span>}
                </div>
              );
            })}
          </div>
          <div style={{...S.section,marginBottom:0}}>
            {selectedIdx===null?<div style={S.msg}>좌측에서 품번을 선택하세요</div>:(()=>{
              const item=batchItems[selectedIdx],r=batchResults[selectedIdx];
              if(!r||r.error)return<div style={{...S.msg,color:C.red}}>{r?.error||"계산 오류"}</div>;
              const{p,best,qpp,estQ,corrRatio,exactMatch,exactCount,tagMatchCount,noData,aq}=r;
              const cUC=qpp>0?Math.round(p.price/qpp):0,eUC=estQ?Math.round(p.price/estQ):0;
              const cPC=qpp>0&&aq>0?Math.ceil(aq/qpp):0,ePC=estQ&&aq>0?Math.ceil(aq/estQ):0;
              return(
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:C.text}}>{item.partNo} <span style={{fontSize:12,fontWeight:400,color:C.textSub}}>{item.name}</span></div>
                      <div style={{fontSize:12,color:C.textSub,marginTop:2}}>
                        <span style={{background:"#e0e7ff",color:"#3730a3",borderRadius:3,padding:"1px 6px",fontSize:11,fontWeight:600,marginRight:6}}>{item.category}</span>
                        {item.tag} · {item.w}×{item.d}×{item.h}mm · {item.mass}kg · {p.name}
                      </div>
                    </div>
                    <span style={{marginLeft:"auto",...S.tag(exactMatch?"amber":noData?"amber":"blue")}}>{exactMatch?"실적값 적용":noData?"비교군 없음":`보정비율 ${corrRatio?.toFixed(2)||"—"}`}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:10}}>
                    <div style={S.resultCard(C.blue)}><div style={{fontSize:11,color:C.textSub,marginBottom:4}}>이론 적입수량</div><div style={{fontSize:20,fontWeight:700,color:C.blue}}>{fmt(qpp)}</div><div style={{fontSize:11,color:C.textMuted}}>{best.cW}×{best.cD}×{best.cH} ({best.l})</div></div>
                    <div style={S.resultCard(C.blue)}><div style={{fontSize:11,color:C.textSub,marginBottom:4}}>이론 개당 단가</div><div style={{fontSize:20,fontWeight:700,color:C.blue}}>₩{fmt(cUC)}</div><div style={{fontSize:11,color:C.textMuted}}>파렛트 {fmt(cPC)}개</div></div>
                    <div style={S.resultCard(C.blue)}><div style={{fontSize:11,color:C.textSub,marginBottom:4}}>이론 연간 포장비</div><div style={{fontSize:20,fontWeight:700,color:C.blue}}>₩{fmt(p.price*cPC)}</div><div style={{fontSize:11,color:C.textMuted}}>{aq>0?fmt(aq)+"개 기준":""}</div></div>
                  </div>
                  {estQ?(
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                      <div style={S.resultCard(exactMatch?C.amber:C.green)}><div style={{fontSize:11,color:C.textSub,marginBottom:4}}>{exactMatch?"실적 적입수량":"추정 적입수량"}</div><div style={{fontSize:20,fontWeight:700,color:exactMatch?C.amber:C.green}}>{fmt(estQ)}</div><div style={{fontSize:11,color:C.textMuted}}>{exactMatch?`DB ${exactCount}개 평균`:`×${corrRatio?.toFixed(2)}`}</div></div>
                      <div style={S.resultCard(exactMatch?C.amber:C.green)}><div style={{fontSize:11,color:C.textSub,marginBottom:4}}>{exactMatch?"실적 개당 단가":"추정 개당 단가"}</div><div style={{fontSize:20,fontWeight:700,color:exactMatch?C.amber:C.green}}>₩{fmt(eUC)}</div><div style={{fontSize:11,color:C.textMuted}}>파렛트 {fmt(ePC)}개</div></div>
                      <div style={S.resultCard(exactMatch?C.amber:C.green)}><div style={{fontSize:11,color:C.textSub,marginBottom:4}}>연간 포장비 (추정)</div><div style={{fontSize:20,fontWeight:700,color:exactMatch?C.amber:C.green}}>₩{fmt(p.price*ePC)}</div><div style={{fontSize:11,color:C.textMuted}}>{aq>0?fmt(aq)+"개 기준":""}</div></div>
                    </div>
                  ):noData?(
                    <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"12px",display:"flex",gap:10}}>
                      <span>⚠️</span><div><div style={{fontSize:13,fontWeight:600,color:"#9a3412",marginBottom:2}}>데이터베이스에 비교군이 없습니다</div><div style={{fontSize:12,color:"#c2410c"}}>대분류 "{item.category}" / 소분류 "{item.tag}"와 일치하는 제품이 없습니다.</div></div>
                    </div>
                  ):null}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* KPI */}
      <div style={S.kpiGrid}>
        <KpiCard label="이론 적입수량" value={kpiQpp>0?fmt(kpiQpp):"—"} unit={kpiQpp>0?"개/파렛트":""} color={C.blue} sub={qResult?.best?`${qResult.best.l} 방향`:undefined}/>
        <KpiCard label="이론 개당 단가" value={kpiUC>0?`₩${fmt(kpiUC)}`:"—"} unit={selPallet?.name||""} color={C.blue}/>
        <KpiCard label="추정 적입수량" value={kpiEstQ?fmt(kpiEstQ):"—"} unit={kpiEstQ?"개/파렛트":""} color={C.green} sub={qResult?.exactMatch?"DB 실적값 직접 적용":qResult?.corrRatio?`보정비율 ${qResult.corrRatio.toFixed(2)}x`:undefined}/>
        <KpiCard label="추정 개당 단가" value={kpiEstUC>0?`₩${fmt(kpiEstUC)}`:"—"} unit={selPallet?.name||""} color={C.green}/>
        <KpiCard label="연간 총 포장비" value={kpiTotal>0?`₩${fmt(Math.round(kpiTotal/10000))}만`:"—"} unit={kpiTotal>0?`파렛트 ${fmt(Math.ceil(kpiAq/(kpiUseQ||1)))}개`:""}color={C.amber} sub="추정 단가 기준"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
        <div>
          {/* 제품 정보 */}
          <div style={S.section}>
            <div style={S.sectionTitle}><span style={{width:3,height:14,background:C.blue,borderRadius:2,display:"inline-block"}}/>신규 제품 정보</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:10}}>
              <div>
                <label style={S.label}>대분류</label>
                <select value={quote.category} onChange={e=>setQ("category",e.target.value)} style={S.select} onFocus={e=>e.target.style.borderColor=C.blue} onBlur={e=>e.target.style.borderColor=C.inputBorder}>
                  <option value="">선택</option>
                  {allCategories.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {[["가로(mm)","w","number","예:400"],["세로(mm)","d","number","예:250"],["높이(mm)","h","number","예:100"],["중량(kg)","mass","number","예:2.5"],["연간생산수량","annualQty","number","예:10000"]].map(([lbl,key,type,ph])=>(
                <div key={key}><label style={S.label}>{lbl}</label><input type={type} value={quote[key]} onChange={e=>setQ(key,e.target.value)} placeholder={ph} style={S.input} onFocus={e=>e.target.style.borderColor=C.blue} onBlur={e=>e.target.style.borderColor=C.inputBorder}/></div>
              ))}
            </div>
            {/* 소분류 클릭 선택 */}
            <div style={{marginBottom:10}}>
              <label style={S.label}>소분류</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:4}}>
                {quoteTags.map(t=>(
                  <button key={t} onClick={()=>setQ("tag",t)} style={{fontSize:11,padding:"3px 10px",borderRadius:20,border:`1px solid ${quote.tag===t?C.blue:C.border}`,background:quote.tag===t?"#dbeafe":"#f8fafc",color:quote.tag===t?C.blue:C.textSub,cursor:"pointer",fontWeight:quote.tag===t?600:400}}>
                    {t}
                  </button>
                ))}
                {quoteTags.length===0&&<span style={{fontSize:12,color:C.textMuted}}>대분류를 먼저 선택하세요</span>}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <label style={{...S.btn("default"),display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer"}}>
                {analyzing?"🔍 AI 분석 중...":quote.image?"✓ 사진 등록됨":"📷 사진 업로드"}
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleQuoteImg(e.target.files[0])}/>
              </label>
              {quote.image&&<img src={quote.image} style={{width:50,height:40,objectFit:"cover",borderRadius:5,border:`1px solid ${C.border}`}}/>}
            </div>
          </div>

          {/* 파렛트 선택 */}
          <div style={S.section}>
            <div style={S.sectionTitle}><span style={{width:3,height:14,background:C.purple,borderRadius:2,display:"inline-block"}}/>파렛트 선택{matched.length>0&&<span style={{marginLeft:"auto",fontSize:11,color:C.green,fontWeight:400}}>✓ 유사 제품 기준 자동 선택됨</span>}</div>
            <div style={S.palletGrid}>
              {PALLETS.map(p=>{
                const pw=getPalletWithPrice(p),net=netKg(p),sel=quote.palletId===p.id,isEd=editingPriceId===p.id;
                return(
                  <div key={p.id} style={S.palletCard(sel)} onClick={()=>setQ("palletId",p.id)}>
                    <div style={{fontSize:13,fontWeight:600,color:sel?C.blue:C.text,marginBottom:3}}>{p.name}</div>
                    <div style={{fontSize:11,color:C.textSub,marginBottom:2}}>{p.w}×{p.d}×{p.h} mm</div>
                    <div style={{fontSize:11,color:C.textMuted,marginBottom:6}}>실적재 {fmt(net)} kg</div>
                    {isEd?(
                      <div style={{display:"flex",alignItems:"center",gap:4}} onClick={e=>e.stopPropagation()}>
                        <span style={{fontSize:12,color:C.textSub}}>₩</span>
                        <input type="text" autoFocus value={editingPriceVal} onChange={e=>setEditingPriceVal(e.target.value.replace(/[^0-9]/g,""))}
                          onKeyDown={e=>{if(e.key==="Enter")commitPrice(p.id);if(e.key==="Escape")commitPrice(null);}}
                          onBlur={()=>commitPrice(p.id)} style={{...S.input,fontSize:13,fontWeight:700,padding:"3px 6px",color:C.blue}}/>
                      </div>
                    ):(
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{fontSize:14,fontWeight:700,color:sel?C.blue:C.textSub}}>
                          ₩{fmt(pw.price)}{pw.price!==p.price&&<span style={{fontSize:10,color:C.amber,marginLeft:4}}>수정됨</span>}
                        </div>
                        <button onClick={e=>startEditPrice(e,p.id,pw.price)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:4,cursor:"pointer",fontSize:11,color:C.textMuted,padding:"2px 6px"}}>수정</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 방향별 분석 */}
          {qResult&&(
            <div style={S.section}>
              <div style={S.sectionTitle}><span style={{width:3,height:14,background:C.green,borderRadius:2,display:"inline-block"}}/>방향별 적입 분석<span style={{marginLeft:"auto",fontSize:11,color:C.textMuted,fontWeight:400}}>6가지 배치 · 최적 자동 선택</span></div>
              <div style={S.orientGrid}>
                {qResult.orients.map(o=>{
                  const isB=o===qResult.best;
                  return(
                    <div key={o.l} style={S.orientCard(isB,o.lim)}>
                      <div style={{fontSize:11,color:isB?"#15803d":o.lim?"#b45309":C.textSub,marginBottom:3,fontWeight:600}}>{o.l}{isB&&" ★"}</div>
                      <div style={{fontSize:17,fontWeight:700,color:isB?"#15803d":o.lim?"#b45309":C.text}}>{o.qpp>0?fmt(o.qpp):"—"}</div>
                      <div style={{fontSize:10,color:C.textMuted}}>{o.qpp>0?`${o.cW}×${o.cD}×${o.cH}`:""}</div>
                      {qResult.mass>0&&o.qpp>0&&<div style={{fontSize:10,color:o.lim?"#b45309":C.textMuted,marginTop:2}}>{fmtD(o.qpp*qResult.mass)}kg{o.lim?" ⚠":""}</div>}
                    </div>
                  );
                })}
              </div>
              {qResult.mass>0&&qResult.best.qpp>0&&(()=>{
                const tw=qResult.best.qpp*qResult.mass,pct=Math.min(100,tw/qResult.net*100);
                const bc=pct>=100?C.red:pct>=80?C.amber:C.green;
                return(
                  <div style={S.weightBar}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.textSub,marginBottom:2}}><span>제품 적재 중량 (이론값 기준)</span><span style={{color:bc,fontWeight:600}}>{fmtD(tw)}kg / {fmt(qResult.net)}kg</span></div>
                    <div style={S.barTrack}><div style={{height:"100%",width:`${pct}%`,background:bc,borderRadius:3}}/></div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textMuted}}><span>한계 {fmt(qResult.p.maxKg)}kg − 자중 {qResult.p.tare}kg = 실적재 {fmt(qResult.net)}kg</span><span style={{color:bc}}>{pct.toFixed(1)}%</span></div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 견적 결과 */}
          {qResult&&(
            <div style={S.section}>
              <div style={S.sectionTitle}><span style={{width:3,height:14,background:C.amber,borderRadius:2,display:"inline-block"}}/>견적 결과</div>
              {qResult.qpp<=0?<div style={S.msg}>어떤 방향으로도 들어가지 않습니다.</div>:!qResult.aq?<div style={S.msg}>연간 생산수량을 입력하세요</div>:(()=>{
                const{p,best,qpp,corrRatio,estQ,pVol,pv,net,mass,aq,exactMatch,exactCount,tagMatchCount,noData}=qResult;
                const cPC=Math.ceil(aq/qpp),cUC=p.price/qpp,cTC=p.price*cPC;
                return(
                  <>
                    <div style={{marginBottom:8,fontSize:12,color:C.textSub}}>이론값 <span style={S.tag("blue")}>최적 방향 이론치</span>{best.lim&&<span style={{...S.tag("amber"),marginLeft:6}}>중량 제한</span>}</div>
                    <div style={S.resultGrid}>
                      <div style={S.resultCard(C.blue)}><div style={{fontSize:11,color:C.textSub,marginBottom:5}}>이론 적입수량</div><div style={{fontSize:22,fontWeight:700,color:C.blue}}>{fmt(qpp)}</div><div style={{fontSize:11,color:C.textMuted}}>개/파렛트 · {best.cW}×{best.cD}×{best.cH}</div></div>
                      <div style={S.resultCard(C.blue)}><div style={{fontSize:11,color:C.textSub,marginBottom:5}}>이론 개당 단가</div><div style={{fontSize:22,fontWeight:700,color:C.blue}}>₩{fmt(cUC)}</div><div style={{fontSize:11,color:C.textMuted}}>{p.name}</div></div>
                      <div style={S.resultCard(C.blue)}><div style={{fontSize:11,color:C.textSub,marginBottom:5}}>이론 연간 포장비</div><div style={{fontSize:22,fontWeight:700,color:C.blue}}>₩{fmt(cTC)}</div><div style={{fontSize:11,color:C.textMuted}}>파렛트 {fmt(cPC)}개</div></div>
                    </div>
                    {estQ!==null?(()=>{
                      const ePC=Math.ceil(aq/estQ),eUC=p.price/estQ,eTC=p.price*ePC;
                      const isExact=exactMatch,color=isExact?C.amber:C.green;
                      const rawEst=corrRatio?Math.round(qpp*corrRatio):estQ;
                      const wLimited=mass>0&&net>0&&estQ<rawEst;
                      const estMass=estQ*mass;
                      const ePct=mass>0?Math.min(100,estMass/net*100):0;
                      const ebc=ePct>=100?C.red:ePct>=80?C.amber:C.green;
                      return(
                        <>
                          <hr style={S.divider}/>
                          <div style={{marginBottom:8,fontSize:12,color:C.textSub}}>{isExact?<>실적값 <span style={S.tag("amber")}>DB 동일 제품 {exactCount}개 기준</span></>:<>추정값 <span style={S.tag("green")}>보정비율 {corrRatio?.toFixed(2)}x · {tagMatchCount}개 유사 제품 기반</span></>}</div>
                          <div style={S.resultGrid}>
                            <div style={S.resultCard(color)}><div style={{fontSize:11,color:C.textSub,marginBottom:5}}>{isExact?"실적 적입수량":"추정 적입수량"}</div><div style={{fontSize:22,fontWeight:700,color}}>{fmt(estQ)}</div><div style={{fontSize:11,color:C.textMuted}}>{isExact?`DB ${exactCount}개 평균`:`이론값 × ${corrRatio?.toFixed(2)}`}</div></div>
                            <div style={S.resultCard(color)}><div style={{fontSize:11,color:C.textSub,marginBottom:5}}>{isExact?"실적 개당 단가":"추정 개당 단가"}</div><div style={{fontSize:22,fontWeight:700,color}}>₩{fmt(eUC)}</div><div style={{fontSize:11,color:C.textMuted}}>{p.name}</div></div>
                            <div style={S.resultCard(color)}><div style={{fontSize:11,color:C.textSub,marginBottom:5}}>연간 포장비 (추정 기준)</div><div style={{fontSize:22,fontWeight:700,color}}>₩{fmt(eTC)}</div><div style={{fontSize:11,color:C.textMuted}}>파렛트 {fmt(ePC)}개</div></div>
                          </div>
                          {mass>0&&(
                            <div style={{...S.weightBar,marginTop:10}}>
                              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.textSub,marginBottom:2}}><span>제품 적재 중량 ({isExact?"실적값":"추정값"} 기준)</span><span style={{color:ebc,fontWeight:600}}>{fmtD(estMass)}kg / {fmt(net)}kg</span></div>
                              <div style={S.barTrack}><div style={{height:"100%",width:`${ePct}%`,background:ebc,borderRadius:3}}/></div>
                              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textMuted}}><span>{fmt(estQ)}개 × {mass}kg = {fmtD(estMass)}kg</span><span style={{color:ebc}}>{ePct.toFixed(1)}%</span></div>
                            </div>
                          )}
                        </>
                      );
                    })():(
                      <>
                        <hr style={S.divider}/>
                        <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"12px",display:"flex",gap:10}}>
                          <span>⚠️</span><div><div style={{fontSize:13,fontWeight:600,color:"#9a3412",marginBottom:2}}>데이터베이스에 비교군이 없습니다</div><div style={{fontSize:12,color:"#c2410c"}}>대분류 "{quote.category}" / 소분류 "{quote.tag}"와 일치하는 DB 제품이 없습니다.</div></div>
                        </div>
                      </>
                    )}
                    <hr style={S.divider}/>
                    <div style={{fontSize:11,color:C.textSub,lineHeight:2}}>
                      실적재: {fmt(p.maxKg)}kg − {p.tare}kg = <b style={{color:C.text}}>{fmt(net)}kg</b>　|　최적 ({best.l}): {best.cW}×{best.cD}×{best.cH} = <b style={{color:C.text}}>{fmt(qpp)}개/파렛트 (이론)</b>
                      {estQ!==null&&(()=>{const raw=corrRatio?Math.round(qpp*corrRatio):estQ;const lim=mass>0&&net>0&&estQ<raw;return<><br/>{exactMatch?`DB 실적값 직접 적용 → `:`이론값 ${fmt(qpp)} × ${corrRatio?.toFixed(2)} = ${fmt(raw)}개`}{lim?<> → <span style={{color:C.amber}}>중량제한</span> → </>:" → "}<b style={{color:C.text}}>{fmt(estQ)}개/파렛트 (추정)</b></>;})()} 
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* 우측: 유사 제품 매칭 패널 */}
        <div>
          <div style={S.section}>
            <div style={S.sectionTitle}><span style={{width:3,height:14,background:C.green,borderRadius:2,display:"inline-block"}}/>유사 제품 매칭{qResult?.tagMatchCount>0&&<span style={{marginLeft:"auto",fontSize:11,color:C.textMuted,fontWeight:400}}>{qResult.tagMatchCount}개 반영</span>}</div>
            {matched.length===0?<div style={{textAlign:"center",padding:"2rem 1rem",color:C.textMuted,fontSize:12}}>제품 사이즈를 입력하면<br/>자동 매칭됩니다</div>:(()=>{
              const nf=shapeFeatures(+quote.w,+quote.d,+quote.h);
              const displayList=qResult?.exactMatch?matched.filter(m=>m.exactMatch):filterForFillRate({category:quote.category,tag:quote.tag,w:+quote.w,d:+quote.d,h:+quote.h},matched);
              return(
                <>
                  {nf&&(
                    <div style={{background:"#f8fafc",border:`1px solid ${C.border}`,borderRadius:7,padding:"10px 12px",marginBottom:10,fontSize:11}}>
                      <div style={{fontWeight:600,color:C.textSub,marginBottom:4}}>신규 제품 형상</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,color:C.textSub}}>
                        <span>형상: <b style={{color:C.text}}>{shapeLabel(nf)}</b></span>
                        <span>납작도: <b style={{color:C.text}}>{(nf.flatness*100).toFixed(0)}%</b></span>
                        <span>길쭉도: <b style={{color:C.text}}>{nf.elongation.toFixed(1)}x</b></span>
                        <span>부피: <b style={{color:C.text}}>{fmt(Math.round(nf.volume/1000))}㎤</b></span>
                      </div>
                    </div>
                  )}
                  {displayList.length===0?<div style={{textAlign:"center",padding:"1.5rem",color:C.textMuted,fontSize:12}}>{quote.tag?"소분류 일치 제품 없음":"소분류를 선택하세요"}</div>:(
                    <div>
                      {displayList.map((m,i)=>{
                        const mp=PALLETS.find(x=>x.id===m.palletId);
                        const mf=shapeFeatures(+m.w,+m.d,+m.h);
                        const mO=qResult?.p?getOrients(qResult.p,[+m.w,+m.d,+m.h],+m.mass||0):null;
                        const mB=mO?getBest(mO):null;
                        const mRatio=mB&&mB.qpp>0?m.actual/mB.qpp:null;
                        return(
                          <div key={m.id||i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:7,background:m.exactMatch?"#fffbeb":"#f8fafc",border:`1px solid ${m.exactMatch?"#fcd34d":C.border}`,marginBottom:5}}>
                            <span style={{fontSize:11,fontWeight:700,color:m.exactMatch?C.amber:C.textMuted,minWidth:20}}>#{i+1}</span>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:11,display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
                                <span style={{background:"#e0e7ff",color:"#3730a3",borderRadius:3,padding:"1px 4px",fontSize:10,fontWeight:600}}>{m.category}</span>
                                <span style={{fontWeight:600,color:C.text}}>{m.tag}</span>
                                {m.exactMatch&&<span style={{fontSize:10,background:"#fef3c7",color:"#92400e",borderRadius:3,padding:"1px 4px",fontWeight:700}}>동일</span>}
                                {mf&&<span style={{fontSize:10,color:C.textMuted}}>· {shapeLabel(mf)}</span>}
                              </div>
                              <div style={{fontSize:11,color:C.textSub}}>{m.w}×{m.d}×{m.h} · <span style={{color:C.green,fontWeight:600}}>{fmt(m.actual)}개</span>{mRatio&&<span style={{color:C.textMuted}}> · 보정 {mRatio.toFixed(2)}x</span>}</div>
                            </div>
                            {mp&&<span style={{fontSize:10,color:C.textMuted,whiteSpace:"nowrap",flexShrink:0}}>{mp.name}</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {qResult?.exactMatch?(
                    <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:8,padding:"10px",textAlign:"center",marginTop:8}}>
                      <div style={{fontSize:11,color:"#92400e",marginBottom:3}}>동일 제품 매칭</div>
                      <div style={{fontSize:18,fontWeight:700,color:C.amber}}>실적값 직접 적용</div>
                      <div style={{fontSize:11,color:"#b45309",marginTop:2}}>DB 동일 제품 {qResult.exactCount}개 평균</div>
                    </div>
                  ):qResult?.corrRatio?(
                    <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:8,padding:"10px",textAlign:"center",marginTop:8}}>
                      <div style={{fontSize:11,color:"#15803d",marginBottom:3}}>평균 보정비율</div>
                      <div style={{fontSize:22,fontWeight:700,color:C.green}}>{qResult.corrRatio.toFixed(2)}x</div>
                      <div style={{fontSize:11,color:"#15803d",marginTop:2}}>{qResult.tagMatchCount}개 유사 제품 기반</div>
                    </div>
                  ):quote.tag?(
                    <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,padding:"10px",textAlign:"center",marginTop:8}}>
                      <div style={{fontSize:13,fontWeight:600,color:"#9a3412",marginBottom:3}}>⚠️ 비교군 없음</div>
                      <div style={{fontSize:11,color:"#c2410c"}}>{quote.category&&`"${quote.category}" `}"{quote.tag}"<br/>일치하는 DB 제품 없음</div>
                    </div>
                  ):null}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

// kpiUseQ 누락 수정
function KpiCardWrapper(){return null;}
