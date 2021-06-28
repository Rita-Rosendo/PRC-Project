import csv

ids = []
rooms = []
roomsPrice = []

with open('hotelDetails.csv', 'r', encoding='utf8') as ficheiro2:
    data2 = csv.reader(ficheiro2, delimiter=',')
    next(data2)
    for row in data2:
        if row[1] not in ids:
            ids.append(row[1])

with open('hotelRooms.csv', 'r', encoding='utf8') as ficheiro:
    data = csv.reader(ficheiro, delimiter=',')
    next(data)
    for row in data:
        if row[1] in ids:
            rooms.append(row)


with open('roomsPrice.csv', 'r', encoding='utf8') as ficheiro:
    data = csv.reader(ficheiro, delimiter=',')
    next(data)
    for row in data:
        if row[2] in ids:
            roomsPrice.append(row)

print(len(roomsPrice))

file_rooms = open('roomsF.ttl',mode='w', encoding='utf8')
for row in rooms:
    file_rooms.write('###  http://www.semanticweb.org/aninhas/ontologies/hoteis#room_' + row[0] + '\n')
    file_rooms.write(':room_'+ row[0] +' rdf:type owl:NamedIndividual ,\n')
    file_rooms.write('\t\t\t:Room ;\n')
    if row[1] != "":
        file_rooms.write('\t:belongs_to :hotel_'+ row[1] +' ;\n')
    if row[2] != "":
        file_rooms.write('\t:room_amenities "' + row[2].replace(":","").replace(";",",").replace("/"," or ").replace("!","") + '" ;\n')
    if row[3] != "":
        file_rooms.write('\t:room_type "'+ row[3].replace('"',"") +'" ;\n')
    if row[4] != "":
        file_rooms.write('\t:room_features "'+ row[4].replace("²",""). replace("!","") +'" ;\n')
    for i in roomsPrice:
        if i[0] == row[0]:
            file_rooms.write('\t:url "'+ i[14]+'" ;\n')
    file_rooms.write('.\n\n\n')

file_rooms.close()
