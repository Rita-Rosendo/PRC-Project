import csv

with open('CommAreas.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

with open('areas.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#comm_" + ind[5] + '\n')
        individuos.write(':comm_' + ind[5] + ' rdf:type owl:NamedIndividual ,\n')
        individuos.write('                  :CommunityArea ;\n')
        individuos.write('         :name "' + ind[6] + '" ;\n')
        individuos.write('         :shape_area ' + ind[8] + ' ;\n')
        individuos.write('         :shape_length ' + ind[9] + ' .\n\n\n')

