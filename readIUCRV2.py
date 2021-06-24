import csv

with open('./New/Chicago_Crimes_2012_to_2017.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

i = 1

with open('iucr2012_2017V2.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        with open('iucr0104.txt') as f:
            iucr = f.readlines()[i]
        if ind[5] == iucr:
            individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#iucr_" + ind[5] + '\n')
            individuos.write(':iucr_' + ind[5] + ' rdf:type owl:NamedIndividual ,\n')
            individuos.write('                  :IUCR ;\n')
            individuos.write('           :iucr_primary_descr "' + ind[6] + '" ;\n')
            individuos.write('           :iucr_secondary_descr "' + ind[7] + '" .\n\n\n')
        i += 1

