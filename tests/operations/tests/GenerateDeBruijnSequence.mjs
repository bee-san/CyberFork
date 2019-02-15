/**
 * De Brujin Sequence tests.
 *
 * @author gchq77703 [gchq77703@gchq.gov.uk]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */
import TestRegister from "../TestRegister";

TestRegister.addTests([
    {
        name: "Small Sequence",
        input: "",
        expectedOutput: "00010111",
        recipeConfig: [
            {
                "op": "Generate De Bruijn Sequence",
                "args": [2, 3]
            }
        ]
    },
    {
        name: "Long Sequence",
        input: "",
        expectedOutput: "0000010000200003000110001200013000210002200023000310003200033001010010200103001110011200113001210012200123001310013200133002010020200203002110021200213002210022200223002310023200233003010030200303003110031200313003210032200323003310033200333010110101201013010210102201023010310103201033011020110301111011120111301121011220112301131011320113301202012030121101212012130122101222012230123101232012330130201303013110131201313013210132201323013310133201333020210202202023020310203202033021030211102112021130212102122021230213102132021330220302211022120221302221022220222302231022320223302303023110231202313023210232202323023310233202333030310303203033031110311203113031210312203123031310313203133032110321203213032210322203223032310323203233033110331203313033210332203323033310333203333111112111131112211123111321113311212112131122211223112321123311312113131132211323113321133312122121231213212133122131222212223122321223312313123221232312332123331313213133132221322313232132331332213323133321333322222322233223232233323233233333",
        recipeConfig: [
            {
                "op": "Generate De Bruijn Sequence",
                "args": [4, 5]
            }
        ]
    }
])