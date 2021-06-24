import csv

with open('./New/Chicago_Crimes_2012_to_2017.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

with open('case2012_2017.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        try:
            individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#crime_" + ind[1] + '\n')
            individuos.write(':crime_' + ind[1] + ' rdf:type owl:NamedIndividual ,\n')
            individuos.write('                        :Crime ;\n')
            if ind[11] == "":
                individuos.write('               :hasBeat "Does not have beat!" ;\n')
            else:
                individuos.write('               :hasBeat :beat_' + ind[11] + ' ;\n')
            if ind[14] == "":
                individuos.write('               :hasCommArea "Does not have community area!" ;\n')
            else:
                individuos.write('               :hasCommArea :comm_' + ind[14].replace(".0","") + ' ;\n')
            if ind[12] == "":
                individuos.write('               :hasDistrict "Does not have district!" ;\n')
            else:
                individuos.write('               :hasDistrict :distr_' + ind[12].replace(".0","") + ' ;\n')
            if ind[5] == "":
                individuos.write('               :hasIUCR "Does not have iucr!" ;\n')
            else:
                individuos.write('               :hasIUCR :iucr_' + ind[5] + ' ;\n')
            if ind[13] == "":
                individuos.write('               :hasWard "Does not have ward!" ;\n')
            else:
                individuos.write('               :hasWard :ward_' + ind[13].replace(".0","") + ' ;\n')
            individuos.write('               :FBI_code "' + ind[15] + '" ;\n')
            if ind[9] == "False":
                individuos.write('               :arrest "false"^^xsd:boolean ;\n')
            elif ind[9] == "True":
                individuos.write('               :arrest "true"^^xsd:boolean ;\n')
            individuos.write('               :block "' + ind[4] + '" ;\n')
            individuos.write('               :case_number "' + ind[2] + '" ;\n')
            individuos.write('               :date "' + ind[3] + '" ;\n')
            if ind[10] == "False":
                individuos.write('               :domestic "false"^^xsd:boolean ;\n')
            elif ind[10] == "True":
                individuos.write('               :domestic "true"^^xsd:boolean ;\n')
            individuos.write('               :latitude "' + ind[20] + '" ;\n')
            individuos.write('               :longitude "' + ind[21] + '" ;\n')
            individuos.write('               :location_descritption "' + ind[8] + '" ;\n')
            individuos.write('               :updated_on "' + ind[19] + '" ;\n')
            individuos.write('               :year ' + ind[18] + ' .\n\n\n')
        except:
            continue