import csv

with open('crimes2001_2004.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

with open('case2001_2004.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        try:
            individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#crime_" + ind[1] + '\n')
            individuos.write(':crime_' + ind[1] + ' rdf:type owl:NamedIndividual ,\n')
            individuos.write('                        :Crime ;\n')
            if ind[11] != "":
                individuos.write('               :hasBeat :beat_' + ind[11] + ' ;\n')
            if ind[14] != "":
                individuos.write('               :HasCommArea :comm_' + ind[14].replace(".0","") + ' ;\n')
            if ind[12] != "":
                individuos.write('               :hasDistrict :distr_' + ind[12].replace(".0","") + ' ;\n')
            if ind[5] != "":
                individuos.write('               :hasIUCR :iucr_' + ind[5] + ' ;\n')
            if ind[13] != "":
                individuos.write('               :hasWard :ward_' + ind[13].replace(".0","") + ' ;\n')
            if ind[15] != "":
                individuos.write('               :FBI_code "' + ind[15] + '" ;\n')
            if ind[9] != "" and ind[9] == "False":
                individuos.write('               :arrest "false"^^xsd:boolean ;\n')
            elif ind[9] != "" and ind[9] == "True":
                individuos.write('               :arrest "true"^^xsd:boolean ;\n')
            if ind[4] != "":
                individuos.write('               :block "' + ind[4] + '" ;\n')
            if ind[2] != "":
                individuos.write('               :case_number "' + ind[2] + '" ;\n')
            if ind[3] != "":
                individuos.write('               :date "' + ind[3] + '" ;\n')
            if ind[10] != "" and ind[10] == "False":
                individuos.write('               :domestic "false"^^xsd:boolean ;\n')
            elif ind[10] != "" and ind[10] == "True":
                individuos.write('               :domestic "true"^^xsd:boolean ;\n')
            if ind[20] != "":
                individuos.write('               :latitude "' + ind[20] + '" ;\n')
            if ind[21] != "":
                individuos.write('               :longitude "' + ind[21] + '" ;\n')
            if ind[8] != "":
                individuos.write('               :location_descritption "' + ind[8] + '" ;\n')
            if ind[19] != "":
                individuos.write('               :updated_on "' + ind[19] + '" ;\n')
            if ind[18] != "":
                individuos.write('               :year ' + ind[18] + ' ;\n')
            individuos.write('.\n\n\n')
        except:
            continue
