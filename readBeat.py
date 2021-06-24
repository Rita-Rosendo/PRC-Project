import csv

with open('PoliceBeatDec2012.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

with open('beats.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#beat_" + ind[4] + '\n')
        individuos.write(':beat_' + ind[4] + ' rdf:type owl:NamedIndividual ,\n')
        individuos.write('                   :Beat ;\n')
        individuos.write('           :locatesIn :distr_' + ind[1] + ' .\n\n\n')
