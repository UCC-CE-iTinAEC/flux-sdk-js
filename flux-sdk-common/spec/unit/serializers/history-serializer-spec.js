import serialize from '../../../src/serializers/history-serializer';
import historyFactory from './../../factories/history-response-factory';

describe('serializers.historySerializer', function() {
  describe('#serialize', function() {
    it('should serialize the events', function() {
      const historyResponse = historyFactory();
      const serializedHistory = serialize(historyResponse);
      const entities = serializedHistory.entities;

      expect(entities.length).toEqual(1);

      const event = entities[0];

      expect(event.cellId).toEqual('CELL_ID');
      expect(event.eventType).toEqual('CELL_MODIFIED');
      expect(event.time).toEqual(jasmine.any(Number));
      expect(event.size).toEqual(jasmine.any(Number));
      expect(event.valueHref).toEqual('/SOME_VALUE_REF_PATH/');
      expect(event.authorId).toEqual('USER_ID');
      expect(event.authorName).toEqual('USERNAME');
      expect(event.clientId).toEqual('CLIENT_ID');
      expect(event.clientName).toEqual('CLIENT NAME');
    });

    describe('with no historyCursor', function() {
      beforeEach(function() {
        const historyResponse = historyFactory();
        this.serializedHistory = serialize(historyResponse);
      });

      it('should set page and limit as 0', function() {
        expect(this.serializedHistory.page).toEqual(0);
        expect(this.serializedHistory.limit).toEqual(0);
      });
    });

    describe('with a historyCursor', function() {
      beforeEach(function() {
        const historyResponse = historyFactory({ page: 2, limit: 5 });
        this.serializedHistory = serialize(historyResponse);
      });

      it('should set page and limit', function() {
        expect(this.serializedHistory.page).toEqual(2);
        expect(this.serializedHistory.limit).toEqual(5);
      });
    });
  });
});
