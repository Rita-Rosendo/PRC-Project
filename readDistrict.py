import csv

with open('PoliceDistrictDec2012.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

with open('districts.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#distr_" + ind[2] + '\n')
        individuos.write(':distr_' + ind[2] + ' rdf:type owl:NamedIndividual ,\n')
        individuos.write('                   :District .\n\n\n')
